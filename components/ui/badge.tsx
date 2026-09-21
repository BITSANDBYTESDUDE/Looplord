import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string;
}

function Badge({ className, color, style, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 font-mono text-[11px] tracking-wide text-mute transition-colors duration-300 hover:text-ink",
        className
      )}
      style={{
        ...(color ? ({ "--chip": color } as React.CSSProperties) : undefined),
        ...style,
      }}
      {...props}
    />
  );
}

export { Badge };
