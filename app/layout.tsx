import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono, Press_Start_2P, VT323, Montserrat } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });
const pressStart = Press_Start_2P({ subsets: ["latin"], variable: "--font-press-start", weight: "400" });
const vt323 = VT323({ subsets: ["latin"], variable: "--font-vt323", weight: "400" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "LoginCraft — Beautiful Login Page Components",
  description:
    "10 handcrafted login components — interactive previews, one-click copy. Beautiful, production-ready React login pages.",
  keywords: ["login page", "react components", "tailwind css", "ui components"],
  openGraph: {
    title: "LoginCraft — Beautiful Login Page Components",
    description: "10 handcrafted login components — interactive previews, one-click copy.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`antialiased bg-[#0a0a0f] text-white ${inter.variable} ${playfair.variable} ${jetbrains.variable} ${pressStart.variable} ${vt323.variable} ${montserrat.variable}`}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
