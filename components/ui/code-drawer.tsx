"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Download, Check, Package, Code as Code2, BookOpen } from "lucide-react";
import { useToast } from "@/components/ui/toast-provider";
import { LoginMeta } from "@/lib/logins";

interface CodeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  login: LoginMeta;
  sourceCode: string;
}

const TABS = ["Component", "Dependencies", "Usage"] as const;
type Tab = (typeof TABS)[number];

export function CodeDrawer({ isOpen, onClose, login, sourceCode }: CodeDrawerProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Component");
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopy = async () => {
    const content = getTabContent();
    await navigator.clipboard.writeText(content);
    setCopied(true);
    showToast("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([sourceCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${login.id}-login.tsx`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Downloaded!");
  };

  const getTabContent = () => {
    if (activeTab === "Component") return sourceCode;
    if (activeTab === "Dependencies") return getDepsContent();
    return getUsageContent();
  };

  const getDepsContent = () => {
    if (login.npmDependencies.length === 0) {
      return "# No additional dependencies required!\n# This component uses only React and Tailwind CSS.";
    }
    return `# Install dependencies\nnpm install ${login.npmDependencies.join(" ")}\n\n# Or with yarn\nyarn add ${login.npmDependencies.join(" ")}\n\n# Or with pnpm\npnpm add ${login.npmDependencies.join(" ")}`;
  };

  const getUsageContent = () => {
    const componentName = login.name.replace(/[\s-]/g, "") + "Login";
    return `// Usage in your Next.js page\nimport { ${componentName} } from "@/components/logins/${login.id}-login";\n\nexport default function LoginPage() {\n  return <${componentName} />;\n}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border-t border-white/10 flex flex-col"
            style={{
              background: "#0d0d1a",
              height: "80vh",
              maxHeight: "800px",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: login.accentColor }}
                />
                <span className="font-semibold text-white">{login.name} Login</span>
                <span className="text-xs text-white/40 bg-white/5 px-2 py-0.5 rounded-full">
                  .tsx
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:block">Download .tsx</span>
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs text-white font-medium px-3 py-1.5 rounded-lg transition-all"
                  style={{ background: login.accentColor }}
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="hidden sm:block">{copied ? "Copied!" : "Copy Code"}</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 flex-shrink-0">
              {TABS.map((tab) => {
                const icons = { Component: Code2, Dependencies: Package, Usage: BookOpen };
                const Icon = icons[tab];
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-2 px-5 py-3 text-sm transition-all border-b-2 ${
                      activeTab === tab
                        ? "text-white border-primary-400"
                        : "text-white/50 border-transparent hover:text-white/80"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto scrollbar-thin">
              <pre
                className="p-6 text-sm font-mono leading-relaxed text-[#abb2bf] whitespace-pre-wrap break-words"
                style={{ fontFamily: "JetBrains Mono, Fira Code, monospace" }}
              >
                <code>{getTabContent()}</code>
              </pre>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
