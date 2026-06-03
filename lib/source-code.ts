export const loginSourceCode: Record<string, string> = {
  axolotl: `"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

// Mouse-tracking eye component
function AxolotlSVG({ cursorPos, passwordFocused }) {
  const getPupilOffset = (eyeCenterX, eyeCenterY) => {
    const maxDist = 6;
    const dx = cursorPos.x - eyeCenterX;
    const dy = cursorPos.y - eyeCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) return { x: 0, y: 0 };
    const scale = Math.min(dist, maxDist) / dist;
    return { x: dx * scale, y: dy * scale };
  };
  // ... full SVG axolotl with animated breathing body
  // Eyes track cursor position in real-time
  // Arms cover eyes on password focus
}

export function AxolotlLogin() {
  const [cursorPos, setCursorPos] = useState({ x: 190, y: 120 });
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const handleMouseMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #0f0f1a, #1a1a2e)" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl p-8"
        style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(24px)" }}
      >
        <AxolotlSVG cursorPos={cursorPos} passwordFocused={passwordFocused} />
        {/* Email, Password with eye-cover animation, Remember me, Sign in, Google OAuth */}
      </motion.div>
    </div>
  );
}`,

  "water-ripple": `"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

// Real-time water ripple simulation
function WaterCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let buf1 = new Float32Array(canvas.width * canvas.height);
    let buf2 = new Float32Array(canvas.width * canvas.height);

    const disturb = (cx, cy, radius = 4, strength = 500) => {
      // Set height map values near cursor
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          if (dx*dx + dy*dy <= radius*radius) {
            buf1[(cy+dy) * canvas.width + (cx+dx)] = strength;
          }
        }
      }
    };

    const render = () => {
      const w = canvas.width, h = canvas.height;
      const damping = 0.99;
      // Wave propagation: average neighbors, subtract previous, apply damping
      for (let y = 1; y < h-1; y++) {
        for (let x = 1; x < w-1; x++) {
          const idx = y * w + x;
          buf2[idx] = ((buf1[idx-1] + buf1[idx+1] + buf1[idx-w] + buf1[idx+w]) / 2 - buf2[idx]) * damping;
        }
      }
      // Render as blue brightness
      const imageData = ctx.createImageData(w, h);
      for (let i = 0; i < w*h; i++) {
        const bright = Math.max(0, Math.min(255, 128 + buf2[i] * 0.5));
        imageData.data[i*4+2] = bright;
        imageData.data[i*4+3] = 180;
      }
      ctx.putImageData(imageData, 0, 0);
      [buf1, buf2] = [buf2, buf1];
      requestAnimationFrame(render);
    };

    canvas.addEventListener("mousemove", (e) => disturb(e.clientX, e.clientY, 3, 300));
    canvas.addEventListener("click", (e) => disturb(e.clientX, e.clientY, 15, 500));
    render();
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export function WaterRippleLogin() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <WaterCanvas />
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <motion.div className="frosted-glass-card">
          {/* Email, Password, Sign In form */}
        </motion.div>
      </div>
    </div>
  );
}`,

  leaf: `"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Animated falling leaves
const LEAVES = Array.from({ length: 10 }, (_, i) => ({
  id: i, left: Math.random() * 100,
  delay: Math.random() * 6,
  duration: 8 + Math.random() * 6,
  size: 20 + Math.random() * 30,
}));

function FallingLeaves() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {LEAVES.map((leaf) => (
        <motion.div key={leaf.id}
          style={{ left: \`\${leaf.left}%\`, position: "absolute", top: "-60px" }}
          animate={{ y: ["0vh", "110vh"], x: [0, Math.sin(leaf.id) * 80], rotate: [0, 360] }}
          transition={{ duration: leaf.duration, delay: leaf.delay, repeat: Infinity }}
        >
          <LeafSVG size={leaf.size} />
        </motion.div>
      ))}
    </div>
  );
}

// GSAP parallax botanical left panel
function BotanicalPanel({ mousePos }) {
  return (
    <div className="relative w-full h-full" style={{ background: "linear-gradient(135deg, #d8f3dc, #95d5b2)" }}>
      <motion.div style={{ x: mousePos.x * -8, y: mousePos.y * -5 }}>
        {/* Background monstera, fern fronds, flowers */}
      </motion.div>
      <motion.div style={{ x: mousePos.x * -14, y: mousePos.y * -10 }}>
        {/* Foreground tropical leaves */}
      </motion.div>
    </div>
  );
}

export function LeafLogin() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 0.1,
      y: (e.clientY / window.innerHeight - 0.5) * 0.1,
    });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="min-h-screen flex" style={{ background: "#fafaf5" }}>
      <FallingLeaves />
      <div className="hidden lg:flex w-3/5"><BotanicalPanel mousePos={mousePos} /></div>
      <div className="flex-1 flex items-center justify-center p-8">
        <form>
          <AnimatePresence>
            {mode === "signup" && (
              <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}>
                <input type="text" placeholder="Name" />
              </motion.div>
            )}
          </AnimatePresence>
          {/* Email, Password, leaf-gradient button, Google/Apple social */}
          <button onClick={() => setMode(m => m === "login" ? "signup" : "login")}>
            Toggle mode
          </button>
        </form>
      </div>
    </div>
  );
}`,

  professional: `"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Check, X, Loader2 } from "lucide-react";

type ValidationState = "idle" | "valid" | "invalid";

export function ProfessionalLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [emailValidation, setEmailValidation] = useState<ValidationState>("idle");
  const [passwordValidation, setPasswordValidation] = useState<ValidationState>("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailValidation !== "valid" || passwordValidation !== "valid") {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#f8fafc" }}>
      <motion.div
        animate={shake ? { x: [-6, 6, -4, 4, -2, 2, 0] } : {}}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-md"
      >
        {/* Logo placeholder */}
        {/* Inline email/password validation with green check / red X */}
        {/* Loading spinner state on submit */}
        {/* Google + Microsoft social login */}
      </motion.div>
    </div>
  );
}`,

  skater: `"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

// 8 animated skaters following bezier paths
const PATHS = [
  (t) => ({ x: (t % 1) * window.innerWidth, y: 150 + Math.sin(t * Math.PI * 2) * 30 }),
  // ... 3 more paths at different y positions
];

export function SkaterLogin() {
  const [skaters, setSkaters] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i, t: i / 8, speed: 0.001 + Math.random() * 0.002,
      depth: Math.random(), pathIndex: i % 4,
      crashed: false, crashTime: 0,
    }))
  );

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setSkaters(prev => prev.map(sk => {
        if (sk.crashed && Date.now() - sk.crashTime > 1500) return { ...sk, crashed: false };
        return { ...sk, t: sk.crashed ? sk.t : sk.t + sk.speed };
      }));
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  // Click nearest skater to crash it
  const handleBgClick = useCallback((e) => {
    const cx = e.clientX, cy = e.clientY;
    setSkaters(prev => {
      const nearest = prev.reduce((a, b) => {
        const posA = PATHS[a.pathIndex](a.t);
        const posB = PATHS[b.pathIndex](b.t);
        return Math.hypot(posA.x - cx, posA.y - cy) < Math.hypot(posB.x - cx, posB.y - cy) ? a : b;
      });
      return prev.map(sk => sk.id === nearest.id
        ? { ...sk, crashed: true, crashTime: Date.now() } : sk);
    });
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden" onClick={handleBgClick}>
      <StarCanvas />
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {skaters.map(sk => {
          const pos = PATHS[sk.pathIndex](sk.t);
          return <SkaterChar key={sk.id} x={pos.x} y={pos.y} crashed={sk.crashed} />;
        })}
      </svg>
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        {/* Semi-transparent dark card with neon #f72585 accent */}
      </div>
    </div>
  );
}`,

  cyberpunk: `"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Terminal typewriter animation
function TypewriterText({ text }) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (idx < text.length) {
      const t = setTimeout(() => {
        setDisplayed(p => p + text[idx]);
        setIdx(i => i + 1);
      }, 60);
      return () => clearTimeout(t);
    }
  }, [idx, text]);
  return <span className="font-mono">{displayed}<span className="animate-pulse">|</span></span>;
}

// Glitch effect on logo hover
function GlitchLogo() {
  const [glitching, setGlitching] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setGlitching(true)}>
      <span className="text-yellow-300 font-mono font-bold">LOGINCRAFT</span>
      {glitching && (
        <>
          <motion.span className="absolute inset-0 text-pink-500"
            animate={{ x: [-3, 3, 0] }} style={{ clipPath: "inset(20% 0 60% 0)" }}>
            LOGINCRAFT
          </motion.span>
          <motion.span className="absolute inset-0 text-cyan-400"
            animate={{ x: [3, -3, 0] }} style={{ clipPath: "inset(60% 0 20% 0)" }}>
            LOGINCRAFT
          </motion.span>
        </>
      )}
    </div>
  );
}

export function CyberpunkLogin() {
  return (
    <div className="min-h-screen" style={{ background: "#050510" }}>
      {/* CRT scanline overlay */}
      <div style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px)" }} />
      {/* Grid background, corner decorations, neon yellow/cyan inputs */}
      <GlitchLogo />
      <TypewriterText text="SYS://LOGIN.EXE" />
      {/* Form with CRT glow on focus */}
    </div>
  );
}`,

  aurora: `"use client";

import { motion } from "framer-motion";

// Pure CSS aurora borealis background
function AuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: "#020617" }}>
      {[
        { color: "#064e3b", top: "10%", left: "20%", delay: "0s", size: "60vw" },
        { color: "#0f766e", top: "60%", left: "10%", delay: "8s", size: "55vw" },
        { color: "#1d4ed8", top: "20%", left: "70%", delay: "2s", size: "45vw" },
        { color: "#5b21b6", top: "70%", left: "60%", delay: "6s", size: "40vw" },
      ].map((blob, i) => (
        <div key={i} className="absolute rounded-full"
          style={{
            width: blob.size, height: blob.size,
            top: blob.top, left: blob.left,
            background: blob.color, filter: "blur(80px)", opacity: 0.4,
            animation: "aurora 12s ease-in-out infinite",
            animationDelay: blob.delay,
          }}
        />
      ))}
    </div>
  );
}

// CSS keyframes in globals.css:
// @keyframes aurora {
//   0%, 100% { transform: translate(0, 0) scale(1); }
//   33% { transform: translate(5%, -5%) scale(1.1); }
//   66% { transform: translate(-5%, 5%) scale(0.9); }
// }

export function AuroraLogin() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <AuroraBackground />
      <motion.div className="relative z-10 bg-white rounded-3xl p-10 shadow-2xl max-w-md w-full">
        {/* Nordic minimalist form with Montserrat font */}
        {/* Emerald green accents */}
      </motion.div>
    </div>
  );
}`,

  "3d-card": `"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

export function ThreeDCardLogin() {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shimmerPos, setShimmerPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    // Calculate tilt from card center
    const dx = ((e.clientX - cx) / (rect.width / 2)) * 12;
    const dy = ((e.clientY - cy) / (rect.height / 2)) * 12;
    setTilt({ x: -dy, y: dx });
    // Track shimmer position
    setShimmerPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <div style={{ perspective: "1200px" }} onMouseMove={handleMouseMove}>
      <motion.div
        ref={cardRef}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Holographic shimmer layer */}
        <div style={{
          background: \`radial-gradient(circle at \${shimmerPos.x}% \${shimmerPos.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)\`,
        }} />
        {/* Floating 3D geometric shapes in background */}
        {/* Login form with cyan #06b6d4 accent */}
      </motion.div>
    </div>
  );
}`,

  "retro-arcade": `"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Pixelated 8-bit aesthetic
export function RetroArcadeLogin() {
  const [coinInserted, setCoinInserted] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking "INSERT COIN" text
  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 600);
    return () => clearInterval(t);
  }, []);

  // Coin drop animation on focus
  const handleFocus = () => {
    if (!coinInserted) {
      setCoinInserted(true);
      setTimeout(() => setCoinInserted(false), 2000);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#0a0a1a", imageRendering: "pixelated" }}>
      {/* Pixel star field background */}
      {/* Pixel city skyline with buildings and windows */}

      {/* Arcade cabinet frame */}
      <div style={{ background: "#1a1a3a", border: "4px solid #ff0" }}>
        {/* Screen bezel */}
        <AnimatePresence>
          {coinInserted && (
            <motion.div initial={{ y: -40 }} animate={{ y: 80, opacity: 0 }}>
              ¢ coin dropping animation
            </motion.div>
          )}
        </AnimatePresence>

        {/* Press Start 2P font heading */}
        <h1 style={{ fontFamily: "Press Start 2P, monospace", color: "#ff0" }}>LOGIN CRAFT</h1>

        {/* VT323 font inputs */}
        <input onFocus={handleFocus} style={{ fontFamily: "VT323, monospace", border: "2px solid #0f0" }} />

        <button style={{ background: "#ff0", fontFamily: "Press Start 2P, monospace" }}>
          PRESS START
        </button>
      </div>
    </div>
  );
}`,

  "minimalist-typography": `"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Pure typographic art login
const WORDS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  weight: [100, 200, 300, 400, 500, 600, 700, 800, 900][i % 9],
  size: [10, 12, 14, 16, 18, 22, 28, 36, 48, 64, 80, 96][i % 12],
  x: Math.random() * 100,
  y: Math.random() * 100,
  opacity: 0.03 + Math.random() * 0.08,
}));

export function MinimalistTypographyLogin() {
  const [focusedField, setFocusedField] = useState(null);

  return (
    <div className="relative min-h-screen" style={{ background: "#ffffff" }}>
      {/* Typography texture: "Login" repeated in varying weights/sizes */}
      <div className="absolute inset-0 pointer-events-none">
        {WORDS.map(word => (
          <div key={word.id}
            className="absolute"
            style={{
              left: \`\${word.x}%\`, top: \`\${word.y}%\`,
              fontWeight: word.weight, fontSize: \`\${word.size}px\`,
              opacity: word.opacity, color: "#000",
              transform: "translate(-50%, -50%)",
            }}
          >
            Login
          </div>
        ))}
      </div>

      {/* Giant background "Login" text (4% opacity) */}
      <span style={{ fontSize: "clamp(80px, 18vw, 180px)", fontWeight: 900, opacity: 0.04 }}>
        Login
      </span>

      {/* Minimalist borderless form - underline inputs only */}
      <form>
        {/* Email + Password with bottom-border-only inputs */}
        {/* Black fill button "Login →" */}
        {/* Zero decoration, pure typography */}
      </form>
    </div>
  );
}`,
};
