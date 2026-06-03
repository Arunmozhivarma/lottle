"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const WORDS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  text: "Login",
  weight: [100, 200, 300, 400, 500, 600, 700, 800, 900][i % 9],
  size: [10, 12, 14, 16, 18, 22, 28, 36, 48, 64, 80, 96][i % 12],
  x: Math.random() * 100,
  y: Math.random() * 100,
  opacity: 0.03 + Math.random() * 0.08,
}));

export function MinimalistTypographyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <div
      className="relative min-h-screen overflow-hidden flex items-center justify-center p-8"
      style={{ background: "#ffffff" }}
    >
      {/* Typography texture background */}
      <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
        {WORDS.map((word) => (
          <div
            key={word.id}
            className="absolute whitespace-nowrap"
            style={{
              left: `${word.x}%`,
              top: `${word.y}%`,
              fontWeight: word.weight,
              fontSize: `${word.size}px`,
              opacity: word.opacity,
              color: "#000000",
              transform: "translate(-50%, -50%)",
              fontFamily: "Inter, system-ui, sans-serif",
              letterSpacing: word.weight > 600 ? "-0.04em" : "0",
            }}
          >
            Login
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Large background "Login" text */}
        <div className="absolute -top-16 left-0 right-0 text-center pointer-events-none select-none">
          <span
            style={{
              fontSize: "clamp(80px, 18vw, 180px)",
              fontWeight: 900,
              color: "#000",
              opacity: 0.04,
              letterSpacing: "-0.05em",
              fontFamily: "Inter, system-ui, sans-serif",
              lineHeight: 1,
            }}
          >
            Login
          </span>
        </div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Heading */}
          <div className="mb-10">
            <div className="flex items-baseline gap-3 mb-2">
              <h1
                style={{
                  fontSize: "clamp(28px, 4vw, 42px)",
                  fontWeight: 900,
                  color: "#000",
                  letterSpacing: "-0.04em",
                  fontFamily: "Inter, system-ui, sans-serif",
                  lineHeight: 1,
                }}
              >
                Login
              </h1>
              <div className="flex-1 h-px bg-black mb-1" />
            </div>
            <p
              style={{
                fontWeight: 300,
                color: "#666",
                fontSize: "14px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              Sign in to continue
            </p>
          </div>

          {/* Fields */}
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: 700,
                  fontSize: "11px",
                  color: "#000",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="your@email.com"
                  className="w-full outline-none bg-transparent"
                  style={{
                    borderBottom: `2px solid ${focusedField === "email" ? "#000" : "#ccc"}`,
                    padding: "8px 0",
                    fontWeight: 400,
                    fontSize: "16px",
                    color: "#000",
                    fontFamily: "Inter, system-ui, sans-serif",
                    transition: "border-color 0.2s",
                  }}
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: 700,
                  fontSize: "11px",
                  color: "#000",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  className="w-full outline-none bg-transparent pr-8"
                  style={{
                    borderBottom: `2px solid ${focusedField === "password" ? "#000" : "#ccc"}`,
                    padding: "8px 0",
                    fontWeight: 400,
                    fontSize: "16px",
                    color: "#000",
                    fontFamily: "Inter, system-ui, sans-serif",
                    transition: "border-color 0.2s",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-3"
                style={{
                  background: "#000",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontFamily: "Inter, system-ui, sans-serif",
                  border: "none",
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Login →
              </motion.button>
              <a
                href="#"
                style={{
                  fontWeight: 300,
                  fontSize: "12px",
                  color: "#999",
                  textDecoration: "none",
                  fontFamily: "Inter, system-ui, sans-serif",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#000")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#999")}
              >
                Forgot?
              </a>
            </div>
          </form>

          <div
            className="mt-10 pt-6"
            style={{ borderTop: "1px solid #eee" }}
          >
            <p
              style={{
                fontWeight: 300,
                fontSize: "12px",
                color: "#999",
                fontFamily: "Inter, system-ui, sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              No account?{" "}
              <a
                href="#"
                style={{ color: "#000", fontWeight: 600, textDecoration: "none" }}
              >
                Register
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
