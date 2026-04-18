"use client";

import { useEffect, useRef } from "react";
import type * as THREETypes from "three";

export default function DossierTorus() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let disposed = false;
    let raf: number;
    let renderer: THREETypes.WebGLRenderer | null = null;
    let ro: ResizeObserver | null = null;

    import("three").then((THREE) => {
      if (disposed) return;

      const mouse = { x: 0, y: 0 };

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const w = wrap.clientWidth;
      const h = wrap.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
      camera.position.z = 6;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      renderer.setClearColor(0x000000, 0);
      wrap.appendChild(renderer.domElement);

      // Main torus knot wireframe
      const group = new THREE.Group();
      scene.add(group);

      const geom = new THREE.TorusKnotGeometry(1.4, 0.35, 140, 20);
      const mat = new THREE.LineBasicMaterial({
        color: 0xc6ff3d,
        transparent: true,
        opacity: 0.9,
      });
      const wire = new THREE.LineSegments(new THREE.EdgesGeometry(geom, 10), mat);
      group.add(wire);

      // Inner ghost torus
      const inner = new THREE.Mesh(
        new THREE.TorusGeometry(1.4, 0.35, 12, 40),
        new THREE.MeshBasicMaterial({
          color: 0x1a1a1a,
          transparent: true,
          opacity: 0.6,
        })
      );
      group.add(inner);

      // Orbiting small cubes
      const cubes: THREETypes.Mesh[] = [];
      for (let i = 0; i < 6; i++) {
        const c = new THREE.Mesh(
          new THREE.BoxGeometry(0.08, 0.08, 0.08),
          new THREE.MeshBasicMaterial({ color: 0xc6ff3d })
        );
        scene.add(c);
        cubes.push(c);
      }

      // Mouse tracking — only within the canvas wrapper
      const onMove = (e: MouseEvent) => {
        const r = wrap.getBoundingClientRect();
        mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        mouse.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
      };
      wrap.addEventListener("mousemove", onMove);

      // Scroll tracking — window-based
      const getScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        return max > 0 ? window.scrollY / max : 0;
      };

      const start = performance.now();
      const localRenderer = renderer;

      const loop = () => {
        if (disposed) return;
        const t = (performance.now() - start) / 1000;
        const scroll = getScroll();

        // Constant drift
        group.rotation.y += prefersReduced ? 0.002 : 0.004;

        if (!prefersReduced) {
          group.rotation.x = mouse.y * 0.5 + Math.sin(t * 0.3) * 0.1;
          group.rotation.z = mouse.x * 0.3;
          camera.position.z = 6 - scroll * 2;
          camera.position.y = scroll * 1.5;
        }

        cubes.forEach((c, i) => {
          const a = t * 0.5 + (i * Math.PI * 2) / cubes.length;
          c.position.x = Math.cos(a) * 2.8;
          c.position.y = Math.sin(a * 1.3) * 2.2;
          c.position.z = Math.sin(a) * 0.5;
          c.rotation.x = t;
          c.rotation.y = t * 0.7;
        });

        localRenderer.render(scene, camera);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      // Resize observer
      ro = new ResizeObserver(() => {
        if (!wrap || !localRenderer) return;
        const nw = wrap.clientWidth;
        const nh = wrap.clientHeight;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        localRenderer.setSize(nw, nh);
      });
      ro.observe(wrap);
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{ position: "absolute", inset: 0 }}
    />
  );
}
