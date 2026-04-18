"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor({ accent = "#c6ff3d" }: { accent?: string }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ x: 0, y: 0, tx: 0, ty: 0, hover: false });

  useEffect(() => {
    // Skip custom cursor on touch devices
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) {
      if (cursorRef.current) cursorRef.current.style.display = "none";
      if (dotRef.current) dotRef.current.style.display = "none";
      return;
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf: number;

    const onMove = (e: MouseEvent) => {
      stateRef.current.tx = e.clientX;
      stateRef.current.ty = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest?.("[data-cursor]");
      stateRef.current.hover = !!t;
    };

    const loop = () => {
      const s = stateRef.current;
      if (prefersReduced) {
        s.x = s.tx;
        s.y = s.ty;
      } else {
        s.x += (s.tx - s.x) * 0.22;
        s.y += (s.ty - s.y) * 0.22;
      }
      const c = cursorRef.current;
      const d = dotRef.current;
      if (c) {
        const size = s.hover ? 56 : 20;
        c.style.transform = `translate(${s.x - size / 2}px, ${s.y - size / 2}px)`;
        c.style.width = size + "px";
        c.style.height = size + "px";
        c.style.borderColor = s.hover ? accent : "currentColor";
        c.style.borderRadius = s.hover ? "2px" : "50%";
      }
      if (d) {
        d.style.transform = `translate(${s.tx - 2}px, ${s.ty - 2}px)`;
        d.style.opacity = s.hover ? "0" : "1";
      }
      raf = requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [accent]);

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 20,
          height: 20,
          border: "1.5px solid currentColor",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          transition:
            "width 0.18s ease, height 0.18s ease, border-radius 0.18s ease, border-color 0.18s ease",
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "currentColor",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          transition: "opacity 0.15s ease",
        }}
      />
    </>
  );
}
