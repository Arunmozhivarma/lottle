"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Code2, ChevronLeft, ChevronRight } from "lucide-react";
import { LoginMeta, logins } from "@/lib/logins";
import { loginSourceCode } from "@/lib/source-code";
import { CodeDrawer } from "@/components/ui/code-drawer";

const componentMap: Record<string, React.ComponentType> = {
  axolotl: dynamic(() => import("@/components/logins/axolotl-login").then(m => m.AxolotlLogin), { ssr: false }),
  "water-ripple": dynamic(() => import("@/components/logins/water-ripple-login").then(m => m.WaterRippleLogin), { ssr: false }),
  leaf: dynamic(() => import("@/components/logins/leaf-login").then(m => m.LeafLogin), { ssr: false }),
  professional: dynamic(() => import("@/components/logins/professional-login").then(m => m.ProfessionalLogin), { ssr: false }),
  skater: dynamic(() => import("@/components/logins/skater-login").then(m => m.SkaterLogin), { ssr: false }),
  cyberpunk: dynamic(() => import("@/components/logins/cyberpunk-login").then(m => m.CyberpunkLogin), { ssr: false }),
  aurora: dynamic(() => import("@/components/logins/aurora-login").then(m => m.AuroraLogin), { ssr: false }),
  "3d-card": dynamic(() => import("@/components/logins/3d-card-login").then(m => m.ThreeDCardLogin), { ssr: false }),
  "retro-arcade": dynamic(() => import("@/components/logins/retro-arcade-login").then(m => m.RetroArcadeLogin), { ssr: false }),
  "minimalist-typography": dynamic(() => import("@/components/logins/minimalist-typography-login").then(m => m.MinimalistTypographyLogin), { ssr: false }),
};

export function PreviewClient({ login }: { login: LoginMeta }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const Component = componentMap[login.id];

  const currentIdx = logins.findIndex((l) => l.id === login.id);
  const prev = logins[currentIdx - 1];
  const next = logins[currentIdx + 1];

  return (
    <div className="relative w-full min-h-screen">
      {/* The login component fills the full screen */}
      {Component && <Component />}

      {/* Floating control bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-xl transition-all"
            style={{
              background: "rgba(10,10,15,0.8)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:block">Gallery</span>
          </Link>

          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
            style={{
              background: "rgba(10,10,15,0.8)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: login.accentColor }}
            />
            <span className="font-medium text-white">{login.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Navigation */}
          <div
            className="flex items-center gap-1 rounded-xl overflow-hidden"
            style={{
              background: "rgba(10,10,15,0.8)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {prev ? (
              <Link
                href={`/previews/${prev.id}`}
                className="flex items-center gap-1 px-2.5 py-2 text-white/60 hover:text-white transition-colors text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:block">{prev.name}</span>
              </Link>
            ) : (
              <span className="flex items-center gap-1 px-2.5 py-2 text-white/20 text-sm">
                <ChevronLeft className="w-4 h-4" />
              </span>
            )}
            <span className="text-white/20 text-xs">|</span>
            {next ? (
              <Link
                href={`/previews/${next.id}`}
                className="flex items-center gap-1 px-2.5 py-2 text-white/60 hover:text-white transition-colors text-sm"
              >
                <span className="hidden sm:block">{next.name}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <span className="flex items-center gap-1 px-2.5 py-2 text-white/20 text-sm">
                <ChevronRight className="w-4 h-4" />
              </span>
            )}
          </div>

          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all"
            style={{
              background: login.accentColor,
            }}
          >
            <Code2 className="w-4 h-4" />
            <span className="hidden sm:block">Get Code</span>
          </button>
        </div>
      </div>

      <CodeDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        login={login}
        sourceCode={loginSourceCode[login.id] ?? "// Source code not available"}
      />
    </div>
  );
}
