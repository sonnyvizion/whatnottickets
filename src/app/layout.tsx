import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CameraFlashesWrapper from "@/components/CameraFlashesWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WhatnotTickets — Billetterie premium pour concerts, matchs & spectacles",
  description: "Billets pour concerts, matchs et spectacles. Vendeurs vérifiés, réponse rapide, paiement sécurisé.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>
        <SmoothScroll />
        <CameraFlashesWrapper />
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
