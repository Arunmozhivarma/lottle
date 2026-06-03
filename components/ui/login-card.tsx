"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Code as Code2, ExternalLink } from "lucide-react";
import { LoginMeta } from "@/lib/logins";
import { CodeDrawer } from "@/components/ui/code-drawer";

interface LoginCardProps {
  login: LoginMeta;
  sourceCode: string;
  index: number;
}

export function LoginCard({ login, sourceCode, index }: LoginCardProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.06 }}
        className="group relative rounded-2xl overflow-hidden border border-white/8 bg-white/3 card-hover cursor-default"
        style={{
          background: "rgba(255,255,255,0.02)",
          borderColor: "rgba(255,255,255,0.08)",
        }}
        whileHover={{
          borderColor: login.accentColor + "60",
          boxShadow: `0 0 30px ${login.accentColor}20`,
        }}
      >
        {/* Thumbnail */}
        <div className="relative overflow-hidden h-52">
          <Image
            src={login.previewImage}
            alt={login.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${login.bgColor}40 0%, ${login.bgColor}90 100%)`,
            }}
          />
          {/* Overlay actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link
              href={`/previews/${login.id}`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:scale-105"
              style={{ background: login.accentColor }}
            >
              <Eye className="w-4 h-4" />
              Preview
            </Link>
          </div>

          {/* Top accent dot */}
          <div
            className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: login.accentColor }}
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-white text-base mb-1.5">{login.name}</h3>
          <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-2">
            {login.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {login.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-white/50 border border-white/8"
              >
                {tag}
              </span>
            ))}
            {login.tags.length > 3 && (
              <span className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-white/40">
                +{login.tags.length - 3}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Link
              href={`/previews/${login.id}`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-medium border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Preview
            </Link>
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90"
              style={{ background: login.accentColor }}
            >
              <Code2 className="w-3.5 h-3.5" />
              Copy Code
            </button>
          </div>
        </div>
      </motion.div>

      <CodeDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        login={login}
        sourceCode={sourceCode}
      />
    </>
  );
}
