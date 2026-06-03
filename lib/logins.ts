export interface LoginMeta {
  id: string;
  name: string;
  description: string;
  tags: string[];
  npmDependencies: string[];
  previewImage: string;
  accentColor: string;
  bgColor: string;
}

export const logins: LoginMeta[] = [
  {
    id: "axolotl",
    name: "Axolotl",
    description:
      "Glassmorphism card with an animated SVG axolotl whose eyes track your cursor. Covers its eyes on password focus.",
    tags: ["React", "Framer Motion", "SVG", "Glassmorphism"],
    npmDependencies: ["framer-motion"],
    previewImage:
      "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800",
    accentColor: "#6366f1",
    bgColor: "#0f0f1a",
  },
  {
    id: "water-ripple",
    name: "Water Ripple",
    description:
      "Real-time water ripple simulation on canvas. The frosted glass login card floats above interactive waves.",
    tags: ["React", "Canvas", "Physics Sim", "Glassmorphism"],
    npmDependencies: [],
    previewImage:
      "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800",
    accentColor: "#00d4ff",
    bgColor: "#0a1628",
  },
  {
    id: "leaf",
    name: "Leaf",
    description:
      "Lush botanical login with animated SVG leaves, parallax panels, and a nature-inspired green palette.",
    tags: ["React", "GSAP", "SVG", "Parallax", "Light Mode"],
    npmDependencies: ["gsap", "@gsap/react"],
    previewImage:
      "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=800",
    accentColor: "#2d6a4f",
    bgColor: "#fafaf5",
  },
  {
    id: "professional",
    name: "Professional",
    description:
      "Fortune 500-grade SaaS login. Clean, trustworthy, production-ready with validation micro-interactions.",
    tags: ["React", "Tailwind CSS", "Framer Motion", "Enterprise"],
    npmDependencies: ["framer-motion"],
    previewImage:
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
    accentColor: "#4f46e5",
    bgColor: "#f8fafc",
  },
  {
    id: "skater",
    name: "Skater",
    description:
      "Gen Z energy with 8-bit skaters grinding bezier paths across a night sky. Click to crash them.",
    tags: ["React", "GSAP", "Canvas", "Playful"],
    npmDependencies: ["gsap", "@gsap/react"],
    previewImage:
      "https://images.pexels.com/photos/1564506/pexels-photo-1564506.jpeg?auto=compress&cs=tinysrgb&w=800",
    accentColor: "#f72585",
    bgColor: "#0f0c29",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description:
      "Terminal-style typing animation, scanline effects, CRT glow on focus, and glitch on hover.",
    tags: ["React", "Framer Motion", "CRT Effect", "Dark"],
    npmDependencies: ["framer-motion"],
    previewImage:
      "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=800",
    accentColor: "#f0e040",
    bgColor: "#050510",
  },
  {
    id: "aurora",
    name: "Aurora",
    description:
      "Full-screen aurora borealis background with pure CSS animated blobs. Nordic minimalism.",
    tags: ["React", "CSS Animation", "Minimalist", "Nordic"],
    npmDependencies: [],
    previewImage:
      "https://images.pexels.com/photos/1933317/pexels-photo-1933317.jpeg?auto=compress&cs=tinysrgb&w=800",
    accentColor: "#34d399",
    bgColor: "#020617",
  },
  {
    id: "3d-card",
    name: "3D Card",
    description:
      "Mouse-tilt responsive login card with holographic shimmer layer and floating 3D geometric shapes.",
    tags: ["React", "CSS 3D", "Three.js", "Holographic"],
    npmDependencies: [],
    previewImage:
      "https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=800",
    accentColor: "#06b6d4",
    bgColor: "#020817",
  },
  {
    id: "retro-arcade",
    name: "Retro Arcade",
    description:
      "8-bit pixelated aesthetic with Press Start 2P font, coin insert animation, and chiptune-inspired CSS.",
    tags: ["React", "Pixel Art", "Retro", "8-bit"],
    npmDependencies: [],
    previewImage:
      "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800",
    accentColor: "#ff0",
    bgColor: "#0a0a1a",
  },
  {
    id: "minimalist-typography",
    name: "Minimalist Typography",
    description:
      "Pure typographic art. The word 'Login' in varying weights forms the visual texture. Anti-design design.",
    tags: ["React", "Typography", "Minimalist", "B&W"],
    npmDependencies: ["framer-motion"],
    previewImage:
      "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=800",
    accentColor: "#000000",
    bgColor: "#ffffff",
  },
];

export function getLogin(id: string): LoginMeta | undefined {
  return logins.find((l) => l.id === id);
}
