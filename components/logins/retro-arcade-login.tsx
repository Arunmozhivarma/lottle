"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function PixelBackground() {
  return (
    <div
      className="fixed inset-0"
      style={{ background: "#0a0a1a", imageRendering: "pixelated" }}
    >
      {/* Star field */}
      {Array.from({ length: 40 }, (_, i) => (
        <div
          key={i}
          className="absolute bg-white"
          style={{
            width: i % 3 === 0 ? 2 : 1,
            height: i % 3 === 0 ? 2 : 1,
            left: `${(i * 37 + 13) % 100}%`,
            top: `${(i * 53 + 7) % 60}%`,
            opacity: 0.4 + (i % 5) * 0.1,
          }}
        />
      ))}

      {/* Scrolling ground */}
      <div className="absolute bottom-0 left-0 right-0 h-16">
        <div
          className="absolute bottom-8 left-0 right-0 h-3"
          style={{ background: "#1a3a1a" }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-8"
          style={{ background: "#0d2211" }}
        />
        {/* Pixel buildings */}
        {[20, 35, 55, 70, 85].map((x, i) => (
          <div
            key={i}
            className="absolute bottom-8"
            style={{
              left: `${x}%`,
              width: 16 + (i % 3) * 8,
              height: 24 + (i % 5) * 8,
              background: "#0d2211",
              boxShadow: "2px 0 0 #1a3a1a",
            }}
          >
            {/* Windows */}
            {Array.from({ length: 3 }, (_, r) =>
              Array.from({ length: 2 }, (__, c) => (
                <div
                  key={`${r}-${c}`}
                  className="absolute"
                  style={{
                    width: 4,
                    height: 4,
                    left: 4 + c * 8,
                    top: 4 + r * 8,
                    background: Math.random() > 0.5 ? "#ff0" : "#222",
                  }}
                />
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function RetroArcadeLogin() {
  const [focused, setFocused] = useState(false);
  const [coinInserted, setCoinInserted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 600);
    return () => clearInterval(t);
  }, []);

  const handleFocus = () => {
    if (!coinInserted) {
      setCoinInserted(true);
      setTimeout(() => setCoinInserted(false), 2000);
    }
    setFocused(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center p-6">
      <PixelBackground />

      <div className="relative z-10 w-full max-w-sm">
        {/* Coin animation */}
        <AnimatePresence>
          {coinInserted && (
            <motion.div
              initial={{ y: -40, opacity: 1, x: 0 }}
              animate={{ y: 80, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute top-0 left-1/2 z-20 flex flex-col items-center"
            >
              <div
                className="w-6 h-6 rounded-full border-2 border-yellow-400 flex items-center justify-center"
                style={{ background: "#d4af37" }}
              >
                <span className="text-xs font-bold" style={{ fontFamily: "VT323, monospace", color: "#0a0a1a" }}>¢</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cabinet frame */}
        <div
          className="rounded-none p-1"
          style={{ background: "#1a1a3a", border: "4px solid #ff0", imageRendering: "pixelated" }}
        >
          {/* Screen bezel */}
          <div
            className="p-6"
            style={{ background: "#0a0a1a", border: "2px solid #333" }}
          >
            {/* Header */}
            <div className="text-center mb-4">
              <div
                className="text-3xl font-bold mb-1"
                style={{
                  fontFamily: "Press Start 2P, monospace",
                  color: "#ff0",
                  textShadow: "2px 2px 0 #aa8800, 0 0 20px rgba(255,255,0,0.5)",
                  fontSize: "18px",
                  lineHeight: 1.4,
                }}
              >
                LOGIN
              </div>
              <div
                style={{
                  fontFamily: "Press Start 2P, monospace",
                  color: "#ff0",
                  fontSize: "10px",
                }}
              >
                CRAFT
              </div>

              <div
                className="mt-3"
                style={{
                  fontFamily: "VT323, monospace",
                  color: blink ? "#0f0" : "transparent",
                  fontSize: "18px",
                }}
              >
                {focused ? "▶ ENTER CREDENTIALS ◀" : "▶ INSERT COIN ◀"}
              </div>
            </div>

            {/* Score display */}
            <div className="flex justify-between mb-4 px-1">
              <div style={{ fontFamily: "Press Start 2P, monospace", fontSize: "8px", color: "#0ff" }}>
                1UP
                <div style={{ color: "#ff0" }}>000000</div>
              </div>
              <div style={{ fontFamily: "Press Start 2P, monospace", fontSize: "8px", color: "#0ff" }}>
                HI-SC
                <div style={{ color: "#ff0" }}>999999</div>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-3">
              <div>
                <div
                  style={{ fontFamily: "Press Start 2P, monospace", fontSize: "8px", color: "#0f0", marginBottom: "6px" }}
                >
                  USER:
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={() => setFocused(false)}
                  placeholder="PLAYER@EMAIL.COM"
                  className="w-full px-3 py-2 outline-none"
                  style={{
                    background: "#000",
                    border: "2px solid #0f0",
                    color: "#0f0",
                    fontFamily: "VT323, monospace",
                    fontSize: "16px",
                    imageRendering: "pixelated",
                    caretColor: "#0f0",
                  }}
                />
              </div>
              <div>
                <div
                  style={{ fontFamily: "Press Start 2P, monospace", fontSize: "8px", color: "#0f0", marginBottom: "6px" }}
                >
                  PASS:
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={() => setFocused(false)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 outline-none"
                  style={{
                    background: "#000",
                    border: "2px solid #0f0",
                    color: "#0f0",
                    fontFamily: "VT323, monospace",
                    fontSize: "16px",
                    imageRendering: "pixelated",
                    caretColor: "#0f0",
                  }}
                />
              </div>

              <motion.button
                type="submit"
                onClick={(e) => e.preventDefault()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 mt-1 font-bold tracking-widest transition-all"
                style={{
                  background: "#ff0",
                  color: "#0a0a1a",
                  fontFamily: "Press Start 2P, monospace",
                  fontSize: "10px",
                  border: "3px solid #aa8800",
                  boxShadow: "3px 3px 0 #664400",
                  imageRendering: "pixelated",
                }}
              >
                PRESS START
              </motion.button>
            </div>

            <div
              className="text-center mt-4"
              style={{ fontFamily: "VT323, monospace", color: "#fff", fontSize: "14px" }}
            >
              NO ACCOUNT?{" "}
              <a href="#" style={{ color: "#ff0" }}>
                NEW GAME
              </a>
            </div>
          </div>

          {/* Controls at bottom */}
          <div className="flex justify-between px-4 py-2">
            {["◀", "▲", "▼", "▶"].map((btn) => (
              <div
                key={btn}
                className="w-7 h-7 flex items-center justify-center rounded-full cursor-pointer"
                style={{
                  background: "#333",
                  border: "2px solid #555",
                  color: "#aaa",
                  fontFamily: "monospace",
                  fontSize: "12px",
                }}
              >
                {btn}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
