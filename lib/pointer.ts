/**
 * Shared normalized pointer position (-1..1 on both axes, +y up).
 * Written once per frame-window by listeners, read by rAF / R3F loops —
 * avoids dozens of competing mousemove handlers.
 */
export const pointer = { x: 0, y: 0, active: false };

export function trackPointer(el: Window | HTMLElement) {
  const update = (clientX: number, clientY: number) => {
    pointer.x = (clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(clientY / window.innerHeight) * 2 + 1;
    pointer.active = true;
  };

  const onMouse = (e: Event) => {
    const m = e as MouseEvent;
    update(m.clientX, m.clientY);
  };

  const onTouch = (e: Event) => {
    const t = (e as TouchEvent).touches[0];
    if (t) update(t.clientX, t.clientY);
  };

  el.addEventListener("mousemove", onMouse as EventListener, { passive: true });
  el.addEventListener("touchmove", onTouch as EventListener, { passive: true });

  return () => {
    el.removeEventListener("mousemove", onMouse as EventListener);
    el.removeEventListener("touchmove", onTouch as EventListener);
  };
}
