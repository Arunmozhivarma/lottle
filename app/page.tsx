"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { LoginCard } from "@/components/ui/login-card";
import { logins } from "@/lib/logins";
import { loginSourceCode } from "@/lib/source-code";

const ParticleBackground = dynamic(
  () => import("@/components/ui/particle-background").then((m) => m.ParticleBackground),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#0a0a0f" }}>
      <ParticleBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-400 text-sm font-medium mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            10 handcrafted components
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-5">
            <span className="text-white">Beautiful Login Pages.</span>
            <br />
            <span
              className="inline-block"
              style={{
                background:
                  "linear-gradient(135deg, #6366f1 0%, #8b5cf6 40%, #a78bfa 70%, #6366f1 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "gradient-x 5s ease infinite",
              }}
            >
              Just Copy &amp; Use.
            </span>
          </h1>

          <p className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            10 handcrafted login components — interactive previews, one-click copy. Built with
            React, Tailwind CSS, and Framer Motion.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#gallery"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white transition-all hover:scale-105 hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)" }}
            >
              Browse Components
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white/70 hover:text-white transition-all border border-white/10 hover:border-white/20"
            >
              View on GitHub
            </a>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8 mt-16"
        >
          {[
            { label: "Components", value: "10" },
            { label: "Framework", value: "React" },
            { label: "Animations", value: "GSAP + Framer" },
            { label: "License", value: "MIT" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-white/40">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="relative z-10 px-6 pb-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-3">Component Gallery</h2>
          <p className="text-white/40">
            Click any card to preview full-screen or copy the source code
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {logins.map((login, i) => (
            <LoginCard
              key={login.id}
              login={login}
              sourceCode={loginSourceCode[login.id] ?? "// Source code not available"}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-6 text-center">
        <p className="text-white/30 text-sm">
          Built with Next.js 14, Tailwind CSS, and Framer Motion
        </p>
      </footer>
    </div>
  );
}
