"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Check, X, Loader as Loader2 } from "lucide-react";

type ValidationState = "idle" | "valid" | "invalid";

function ValidationIcon({ state }: { state: ValidationState }) {
  if (state === "valid")
    return <Check className="w-4 h-4 text-emerald-500" />;
  if (state === "invalid")
    return <X className="w-4 h-4 text-red-500" />;
  return null;
}

export function ProfessionalLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [emailValidation, setEmailValidation] = useState<ValidationState>("idle");
  const [passwordValidation, setPasswordValidation] = useState<ValidationState>("idle");

  const validateEmail = (val: string) => {
    if (!val) return setEmailValidation("idle");
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    setEmailValidation(valid ? "valid" : "invalid");
  };

  const validatePassword = (val: string) => {
    if (!val) return setPasswordValidation("idle");
    setPasswordValidation(val.length >= 8 ? "valid" : "invalid");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailValidation !== "valid" || passwordValidation !== "valid") {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "#f8fafc" }}
    >
      <motion.div
        animate={shake ? { x: [-6, 6, -4, 4, -2, 2, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[400px] bg-white rounded-2xl p-8"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)" }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#4f46e5] flex items-center justify-center">
              <svg viewBox="0 0 16 16" className="w-4 h-4" fill="white">
                <rect x="2" y="2" width="5" height="5" rx="1" />
                <rect x="9" y="2" width="5" height="5" rx="1" opacity="0.6" />
                <rect x="2" y="9" width="5" height="5" rx="1" opacity="0.6" />
                <rect x="9" y="9" width="5" height="5" rx="1" />
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-lg">Acme Corp</span>
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Welcome back</h1>
        <p className="text-gray-500 text-sm mb-6">Sign in to your account</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                placeholder="you@company.com"
                className="w-full px-4 py-3 pr-10 text-sm text-gray-900 placeholder-gray-400 bg-white border rounded-lg outline-none transition-all"
                style={{
                  border:
                    emailValidation === "invalid"
                      ? "1px solid #ef4444"
                      : emailValidation === "valid"
                      ? "1px solid #22c55e"
                      : "1px solid #e2e8f0",
                }}
                onFocus={(e) => {
                  if (emailValidation === "idle")
                    e.target.style.border = "1px solid #4f46e5";
                }}
                onBlur={(e) => {
                  if (emailValidation === "idle")
                    e.target.style.border = "1px solid #e2e8f0";
                  validateEmail(email);
                }}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <ValidationIcon state={emailValidation} />
              </div>
            </div>
            <AnimatePresence>
              {emailValidation === "invalid" && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-xs text-red-500 mt-1"
                >
                  Please enter a valid email address
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
                placeholder="Min. 8 characters"
                className="w-full px-4 py-3 pr-20 text-sm text-gray-900 placeholder-gray-400 bg-white border rounded-lg outline-none transition-all"
                style={{
                  border:
                    passwordValidation === "invalid"
                      ? "1px solid #ef4444"
                      : passwordValidation === "valid"
                      ? "1px solid #22c55e"
                      : "1px solid #e2e8f0",
                }}
                onFocus={(e) => {
                  if (passwordValidation === "idle")
                    e.target.style.border = "1px solid #4f46e5";
                }}
                onBlur={(e) => {
                  if (passwordValidation === "idle")
                    e.target.style.border = "1px solid #e2e8f0";
                  validatePassword(password);
                }}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                <ValidationIcon state={passwordValidation} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <AnimatePresence>
              {passwordValidation === "invalid" && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-xs text-red-500 mt-1"
                >
                  Password must be at least 8 characters
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div
                onClick={() => setRemember(!remember)}
                className="w-4 h-4 rounded border flex items-center justify-center transition-all cursor-pointer"
                style={{
                  background: remember ? "#4f46e5" : "white",
                  border: remember ? "1px solid #4f46e5" : "1px solid #e2e8f0",
                }}
              >
                {remember && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </div>
              <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                Remember me
              </span>
            </label>
            <a
              href="#"
              className="text-sm text-[#4f46e5] hover:text-[#4338ca] transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={!loading ? { scale: 1.01 } : {}}
            whileTap={!loading ? { scale: 0.99 } : {}}
            className="w-full py-3 rounded-lg font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-80"
            style={{ background: "#4f46e5" }}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </motion.button>
        </form>

        <div className="relative flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="space-y-2.5">
          <button className="w-full py-3 flex items-center justify-center gap-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
            <svg viewBox="0 0 24 24" className="w-4 h-4">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>
          <button className="w-full py-3 flex items-center justify-center gap-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
            <svg viewBox="0 0 24 24" className="w-4 h-4">
              <path d="M21.53 15.93c-.16-.27-.61-1.08-.83-1.49l-3.16-5.58a.9.9 0 0 0-1.55 0L14.08 11H11V9.5a.5.5 0 0 0-.86-.35L7.34 12l2.8 2.85a.5.5 0 0 0 .86-.35V13h2.21l-1.04 1.85a.9.9 0 0 0 .77 1.35H21a.5.5 0 0 0 .53-.27z" fill="#00adef" />
              <rect x="2" y="6" width="7" height="12" rx="1" fill="#737373" />
            </svg>
            Continue with Microsoft
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-[#4f46e5] font-medium hover:text-[#4338ca] transition-colors">
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
}
