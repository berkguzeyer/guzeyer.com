"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import CustomCursor from "@/components/CustomCursor";
import Magnetic from "@/components/Magnetic";
import styles from "./page.module.css";

const DossierTorus = dynamic(() => import("@/components/DossierTorus"), {
  ssr: false,
});

const mono = "var(--font-mono), ui-monospace, monospace";
const display = "var(--font-display), -apple-system, sans-serif";

const ui = {
  bg: "#0a0a0a",
  text: "#e8e8e3",
  muted: "#6a6a65",
  line: "#222220",
  accent: "#c6ff3d",
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: mono,
        fontSize: 10,
        letterSpacing: "0.18em",
        color: ui.muted,
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

const CORNER_POSITIONS = [
  {
    top: 16,
    left: 16,
    borderTop: `1px solid ${ui.accent}`,
    borderLeft: `1px solid ${ui.accent}`,
  },
  {
    top: 16,
    right: 16,
    borderTop: `1px solid ${ui.accent}`,
    borderRight: `1px solid ${ui.accent}`,
  },
  {
    bottom: 16,
    left: 16,
    borderBottom: `1px solid ${ui.accent}`,
    borderLeft: `1px solid ${ui.accent}`,
  },
  {
    bottom: 16,
    right: 16,
    borderBottom: `1px solid ${ui.accent}`,
    borderRight: `1px solid ${ui.accent}`,
  },
] as const;

const METRICS = [
  ["PROJECTS", "42+"],
  ["YRS_SHIPPING", "8"],
  ["LOC_AUTHORED", "1.2M"],
  ["COFFEE_Λ", "∞"],
] as const;

const NAV_LINKS = ["STACK", "LOG", "CONTACT"] as const;

const MARQUEE_ITEMS = [
  "TYPESCRIPT",
  "REACT",
  "NEXT.JS",
  "WEBGL",
  "THREE.JS",
  "TAILWIND",
  "NODE.JS",
  "GRAPHQL",
  "DESIGN_SYSTEMS",
];

const CONTACT_LINKS = [
  { label: "EMAIL", value: "guzeyerberk@gmail.com", href: "mailto:guzeyerberk@gmail.com" },
  { label: "GITHUB", value: "@berkguzeyer", href: "https://github.com/berkguzeyer" },
  {
    label: "LINKEDIN",
    value: "/in/berkguzeyer",
    href: "https://linkedin.com/in/berkguzeyer",
  },
] as const;

export default function Home() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " EST"
      );
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <>
      {/* Top bar */}
      <header className={styles.topBar} style={{ fontFamily: mono }}>
        <div className={styles.topBarLeft}>
          <div style={{ color: ui.accent, letterSpacing: "0.3em" }}>BG//</div>
          <Label>v2026.04</Label>
        </div>
        <nav className={styles.topBarNav}>
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              data-cursor="1"
              href={`#${l.toLowerCase()}`}
              style={{
                color: ui.text,
                textDecoration: "none",
                fontSize: 11,
                letterSpacing: "0.18em",
                fontFamily: mono,
              }}
            >
              {l}
            </a>
          ))}
        </nav>
        <div className={styles.topBarClock} style={{ fontFamily: mono }}>
          {time}
        </div>
      </header>

      {/* Hero grid */}
      <section className={styles.heroGrid}>
        {/* Left column — identity */}
        <div className={styles.heroLeft}>
          <div>
            <Label>SUBJECT_ID</Label>
            <div
              style={{
                fontFamily: display,
                fontSize: 20,
                fontWeight: 700,
                marginTop: 8,
                lineHeight: 1.1,
              }}
            >
              BERK
              <br />
              GUZEYER
            </div>
          </div>
          <div>
            <Label>ROLE</Label>
            <div
              style={{ marginTop: 6, fontSize: 12, color: ui.text, fontFamily: mono }}
            >
              SR. SOFTWARE ENGR.
            </div>
          </div>
          <div>
            <Label>DISCIPLINE</Label>
            <div style={{ marginTop: 6, fontSize: 12, fontFamily: mono }}>
              FRONTEND / INTERFACE
            </div>
          </div>
          <div>
            <Label>STATUS</Label>
            <div
              style={{
                marginTop: 6,
                fontSize: 12,
                color: ui.accent,
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: mono,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  background: ui.accent,
                  borderRadius: "50%",
                  boxShadow: `0 0 12px ${ui.accent}`,
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              OPEN TO ROLES
            </div>
          </div>
          <div style={{ marginTop: "auto" }} />
        </div>

        {/* Center column — 3D */}
        <div className={styles.heroCenter}>
          <DossierTorus />

          {/* Corner brackets */}
          {CORNER_POSITIONS.map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 16,
                height: 16,
                zIndex: 3,
                ...pos,
              }}
            />
          ))}

          {/* Coordinates */}
          <div
            style={{
              position: "absolute",
              top: 16,
              right: 32,
              fontSize: 10,
              color: ui.muted,
              zIndex: 3,
              textAlign: "right",
              fontFamily: mono,
            }}
          >
            <div>27.9506°N / 82.4572°W</div>
            <div>TAMPA, FL</div>
          </div>

          {/* Hero title overlay */}
          <div
            style={{
              position: "absolute",
              left: 32,
              bottom: 32,
              right: 32,
              zIndex: 3,
            }}
          >
            <Label>INTERFACE_ARCHITECT // 2018→2026</Label>
            <div
              className={styles.heroHeadline}
              style={{
                fontFamily: display,
                fontWeight: 800,
              }}
            >
              BUILDING
              <br />
              <span style={{ color: ui.accent }}>INTERFACES</span>
              <br />
              AT THE EDGE.
            </div>
          </div>
        </div>

        {/* Right column — telemetry */}
        <div className={styles.heroRight}>
          <Label>TELEMETRY</Label>
          <div className={styles.metricsGrid}>
            {METRICS.map(([k, v]) => (
              <div key={k}>
                <div
                  style={{
                    fontSize: 10,
                    color: ui.muted,
                    letterSpacing: "0.15em",
                    fontFamily: mono,
                  }}
                >
                  {k}
                </div>
                <div
                  style={{
                    fontFamily: display,
                    fontSize: 32,
                    fontWeight: 700,
                    marginTop: 2,
                  }}
                >
                  {v}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <Label>HANDSHAKE</Label>
            <Magnetic
              as="a"
              href="#contact"
              style={{
                display: "block",
                background: ui.accent,
                color: "#0a0a0a",
                padding: "14px 18px",
                fontFamily: mono,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.15em",
                textAlign: "center",
                textDecoration: "none",
                border: "none",
                cursor: "none",
              }}
            >
              INITIATE_CONTACT →
            </Magnetic>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div id="stack" className={styles.marquee}>
        <div
          className={`marquee-inner ${styles.marqueeInner}`}
          style={{ fontFamily: display }}
        >
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <span key={i}>
                {MARQUEE_ITEMS.map((item) => (
                  <span key={`${i}-${item}`}>
                    {item}{" "}
                    <span style={{ color: ui.accent }}>◆</span>{" "}
                  </span>
                ))}
              </span>
            ))}
        </div>
      </div>

      {/* Contact footer */}
      <section id="contact" className={styles.contactGrid}>
        <div>
          <Label>TRANSMIT</Label>
          <div className={styles.contactHeadline} style={{ fontFamily: display }}>
            LET&apos;S
            <br />
            BUILD
            <br />
            <span style={{ color: ui.accent }}>SOMETHING.</span>
          </div>
        </div>
        <div className={styles.contactLinks}>
          {CONTACT_LINKS.map(({ label, value, href }) => (
            <a
              data-cursor="1"
              key={label}
              href={href}
              target={label === "EMAIL" ? undefined : "_blank"}
              rel={label === "EMAIL" ? undefined : "noopener noreferrer"}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "14px 0",
                borderTop: `1px solid ${ui.line}`,
                color: ui.text,
                textDecoration: "none",
                fontSize: 13,
                fontFamily: mono,
              }}
            >
              <span
                style={{
                  color: ui.muted,
                  fontSize: 10,
                  letterSpacing: "0.18em",
                }}
              >
                {label}
              </span>
              <span>{value} →</span>
            </a>
          ))}
        </div>
      </section>

      {/* Colophon */}
      <footer className={styles.colophon} style={{ fontFamily: mono }}>
        <span>© 2026 B.GUZEYER</span>
        <span>COMPILED: APR_17_2026</span>
        <span>EOF.</span>
      </footer>

      <CustomCursor accent={ui.accent} />
    </>
  );
}
