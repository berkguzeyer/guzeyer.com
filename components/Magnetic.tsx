"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

interface MagneticProps {
  children: ReactNode;
  as?: keyof HTMLElementTagNameMap;
  strength?: number;
  style?: CSSProperties;
  href?: string;
  className?: string;
  "data-cursor"?: string;
}

export default function Magnetic({
  children,
  as: Tag = "button",
  strength = 0.35,
  style,
  ...rest
}: MagneticProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const onLeave = () => {
      el.style.transform = "translate(0,0)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  const TagName = Tag as string;

  return (
    // @ts-expect-error dynamic tag
    <TagName
      ref={ref}
      data-cursor="1"
      style={{
        transition: "transform 0.25s cubic-bezier(.2,.8,.2,1)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </TagName>
  );
}
