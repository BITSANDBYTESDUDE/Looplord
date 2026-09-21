"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { pointer } from "@/lib/pointer";

export interface RobotProps {
  /** Start the walk-in entrance (hero) or appear immediately (mini). */
  active?: boolean;
  /** "hero" walks in from the left edge; "mini" idles in place and waves on a loop. */
  mode?: "hero" | "mini";
  position?: [number, number, number];
  scale?: number;
}

const LIFT = 2.45;

export function Robot({
  active = true,
  mode = "hero",
  position = [0, -1.95, 0],
  scale = 1,
}: RobotProps) {
  const { size, viewport } = useThree();
  const isMobile = size.width < 768;

  const root = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const legL = useRef<THREE.Group>(null);
  const legR = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);
  const antTip = useRef<THREE.MeshBasicMaterial>(null);
  const chestCore = useRef<THREE.MeshBasicMaterial>(null);

  const state = useRef({
    x: mode === "hero" ? -7 : 0,
    walkPhase: 0,
    waveUntil: -1,
    nextBlink: 2.4,
    blinkAt: 0,
    blinking: false,
    lastT: 0,
    entered: mode === "mini",
  });

  // Wave when asked ("robot:wave" events) or on loop in mini mode.
  useEffect(() => {
    const trigger = () => {
      state.current.waveUntil = state.current.lastT + 2.8;
    };
    window.addEventListener("robot:wave", trigger);

    if (mode === "mini") {
      const kickoff = window.setTimeout(trigger, 900);
      const loop = window.setInterval(trigger, 5200);
      return () => {
        window.removeEventListener("robot:wave", trigger);
        window.clearTimeout(kickoff);
        window.clearInterval(loop);
      };
    }
    return () => window.removeEventListener("robot:wave", trigger);
  }, [mode]);

  const materials = useMemo(
    () => ({
      shell: new THREE.MeshStandardMaterial({
        color: "#171A21",
        metalness: 0.72,
        roughness: 0.32,
      }),
      panel: new THREE.MeshStandardMaterial({
        color: "#0D0F14",
        metalness: 0.6,
        roughness: 0.45,
      }),
      trim: new THREE.MeshStandardMaterial({
        color: "#E8EAEF",
        metalness: 0.35,
        roughness: 0.4,
      }),
    }),
    []
  );

  useFrame((frameState, delta) => {
    const s = state.current;
    const t = frameState.clock.elapsedTime;
    s.lastT = t;
    if (!root.current || !body.current || !head.current) return;

    const waving = t < s.waveUntil;

    // --- locomotion ------------------------------------------------------
    const targetX =
      mode === "mini" ? 0 : isMobile ? 0 : Math.min(viewport.width * 0.3, 2.25);
    const goal = active || mode === "mini" ? targetX : -7;
    const prevX = s.x;
    s.x = THREE.MathUtils.damp(s.x, goal, 1.7, delta);
    const walking = Math.abs(s.x - goal) > 0.06 && Math.abs(s.x - prevX) > 0.0008;
    if (walking) s.entered = true;

    root.current.position.x = s.x;
    root.current.position.y = position[1];

    if (walking) {
      s.walkPhase += delta * 8.5;
      const p = s.walkPhase;
      if (legL.current && legR.current) {
        legL.current.rotation.x = Math.sin(p) * 0.55;
        legR.current.rotation.x = Math.sin(p + Math.PI) * 0.55;
      }
      if (armL.current && !waving)
        armL.current.rotation.x = Math.sin(p + Math.PI) * 0.42;
      if (armR.current && !waving)
        armR.current.rotation.x = Math.sin(p) * 0.42;
      body.current.position.y = Math.abs(Math.sin(p)) * 0.05;
      body.current.rotation.z = Math.sin(p) * 0.03;
    } else if (s.entered || mode === "mini") {
      // --- idle breathing ------------------------------------------------
      if (legL.current && legR.current) {
        legL.current.rotation.x = THREE.MathUtils.damp(legL.current.rotation.x, 0, 8, delta);
        legR.current.rotation.x = THREE.MathUtils.damp(legR.current.rotation.x, 0, 8, delta);
      }
      body.current.position.y = Math.sin(t * 1.5) * 0.035;
      body.current.rotation.z = Math.sin(t * 0.7) * 0.014;
      if (armL.current)
        armL.current.rotation.x = Math.sin(t * 1.2) * 0.07;
      if (armR.current && !waving)
        armR.current.rotation.x = Math.sin(t * 1.2 + 0.4) * 0.07;
    }

    // --- wave ------------------------------------------------------------
    if (armR.current) {
      const targetLift = waving ? LIFT + Math.sin(t * 9) * 0.22 : 0;
      const targetTwist = waving ? 0.35 : 0;
      armR.current.rotation.z = THREE.MathUtils.damp(
        armR.current.rotation.z,
        targetLift,
        10,
        delta
      );
      armR.current.rotation.y = THREE.MathUtils.damp(
        armR.current.rotation.y,
        targetTwist,
        10,
        delta
      );
    }

    // --- cursor tracking ---------------------------------------------------
    const px = THREE.MathUtils.clamp(pointer.x, -1, 1);
    const py = THREE.MathUtils.clamp(pointer.y, -1, 1);
    head.current.rotation.y = THREE.MathUtils.damp(
      head.current.rotation.y,
      px * 0.55,
      5,
      delta
    );
    head.current.rotation.x = THREE.MathUtils.damp(
      head.current.rotation.x,
      -py * 0.28,
      5,
      delta
    );
    head.current.rotation.z = THREE.MathUtils.damp(
      head.current.rotation.z,
      waving ? -0.14 : px * 0.05,
      5,
      delta
    );
    root.current.rotation.y = THREE.MathUtils.damp(
      root.current.rotation.y,
      px * 0.12,
      4,
      delta
    );

    // --- blinking ----------------------------------------------------------
    if (eyes.current) {
      if (!s.blinking && t > s.nextBlink) {
        s.blinking = true;
        s.blinkAt = t;
      }
      if (s.blinking && t - s.blinkAt > 0.14) {
        s.blinking = false;
        s.nextBlink = t + 2.2 + Math.random() * 3.2;
      }
      eyes.current.scale.y = THREE.MathUtils.damp(
        eyes.current.scale.y,
        s.blinking ? 0.08 : 1,
        30,
        delta
      );
    }

    // --- glow pulses -------------------------------------------------------
    if (antTip.current)
      (antTip.current as THREE.MeshBasicMaterial).opacity =
        0.72 + Math.sin(t * 2.8) * 0.28;
    if (chestCore.current)
      (chestCore.current as THREE.MeshBasicMaterial).opacity =
        0.75 + Math.sin(t * 2.2 + 1.2) * 0.25;
  });

  return (
    <group ref={root} position={position} scale={scale * (isMobile && mode === "hero" ? 0.78 : 1)}>
      <group ref={body}>
        {/* legs */}
        <group ref={legL} position={[-0.27, 1.12, 0]}>
          <mesh material={materials.panel} position={[0, -0.42, 0]}>
            <capsuleGeometry args={[0.15, 0.5, 6, 16]} />
          </mesh>
          <RoundedBox
            material={materials.shell}
            args={[0.3, 0.13, 0.44]}
            radius={0.05}
            position={[0, -0.73, 0.06]}
          />
        </group>
        <group ref={legR} position={[0.27, 1.12, 0]}>
          <mesh material={materials.panel} position={[0, -0.42, 0]}>
            <capsuleGeometry args={[0.15, 0.5, 6, 16]} />
          </mesh>
          <RoundedBox
            material={materials.shell}
            args={[0.3, 0.13, 0.44]}
            radius={0.05}
            position={[0, -0.73, 0.06]}
          />
        </group>

        {/* torso */}
        <RoundedBox
          material={materials.shell}
          args={[1.16, 1.28, 0.78]}
          radius={0.18}
          smoothness={8}
          position={[0, 1.88, 0]}
        />
        <RoundedBox
          material={materials.trim}
          args={[0.5, 0.1, 0.02]}
          radius={0.04}
          position={[0, 1.62, 0.39]}
        />
        {/* glowing chest core */}
        <mesh position={[0, 2.06, 0.4]}>
          <circleGeometry args={[0.17, 32]} />
          <meshBasicMaterial ref={chestCore} color="#22D3EE" transparent opacity={0.9} />
        </mesh>
        <mesh position={[0, 2.06, 0.395]}>
          <torusGeometry args={[0.235, 0.022, 8, 40]} />
          <meshBasicMaterial color="#3B82F6" />
        </mesh>

        {/* left arm */}
        <group ref={armL} position={[-0.74, 2.28, 0]}>
          <mesh material={materials.panel} position={[0, -0.33, 0]}>
            <capsuleGeometry args={[0.13, 0.48, 6, 16]} />
          </mesh>
          <mesh material={materials.trim} position={[0, -0.68, 0]}>
            <sphereGeometry args={[0.17, 24, 24]} />
          </mesh>
        </group>

        {/* right (waving) arm */}
        <group ref={armR} position={[0.74, 2.28, 0]}>
          <mesh material={materials.panel} position={[0, -0.33, 0]}>
            <capsuleGeometry args={[0.13, 0.48, 6, 16]} />
          </mesh>
          <mesh material={materials.trim} position={[0, -0.68, 0]}>
            <sphereGeometry args={[0.17, 24, 24]} />
          </mesh>
        </group>

        {/* head */}
        <group ref={head} position={[0, 2.62, 0]}>
          <mesh material={materials.panel} position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.12, 0.16, 0.16, 16]} />
          </mesh>
          <RoundedBox
            material={materials.shell}
            args={[0.98, 0.82, 0.78]}
            radius={0.2}
            smoothness={8}
            position={[0, 0.44, 0]}
          />
          {/* face plate */}
          <RoundedBox
            material={materials.panel}
            args={[0.74, 0.5, 0.08]}
            radius={0.1}
            position={[0, 0.44, 0.36]}
          />
          {/* eyes */}
          <group ref={eyes} position={[0, 0.48, 0.41]}>
            <mesh position={[-0.18, 0, 0]}>
              <sphereGeometry args={[0.085, 20, 20]} />
              <meshBasicMaterial color="#22D3EE" />
            </mesh>
            <mesh position={[0.18, 0, 0]}>
              <sphereGeometry args={[0.085, 20, 20]} />
              <meshBasicMaterial color="#22D3EE" />
            </mesh>
          </group>
          {/* smile */}
          <mesh position={[0, 0.3, 0.415]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.1, 0.016, 8, 24, Math.PI]} />
            <meshBasicMaterial color="#3B82F6" />
          </mesh>
          {/* ears */}
          <mesh
            material={materials.trim}
            position={[-0.53, 0.44, 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.09, 0.09, 0.1, 20]} />
          </mesh>
          <mesh
            material={materials.trim}
            position={[0.53, 0.44, 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.09, 0.09, 0.1, 20]} />
          </mesh>
          {/* antenna */}
          <mesh material={materials.trim} position={[0, 0.98, 0]}>
            <cylinderGeometry args={[0.022, 0.022, 0.28, 10]} />
          </mesh>
          <mesh position={[0, 1.16, 0]}>
            <sphereGeometry args={[0.07, 18, 18]} />
            <meshBasicMaterial ref={antTip} color="#60A5FA" transparent />
          </mesh>
        </group>

        {/* head glow */}
        <pointLight
          position={[0, 3.1, 0.9]}
          intensity={2.2}
          distance={3.2}
          color="#22D3EE"
        />
      </group>

      <ContactShadows
        position={[0, 0.02, 0]}
        scale={6.5}
        blur={2.6}
        far={3.4}
        opacity={0.55}
        color="#000000"
      />
    </group>
  );
}
