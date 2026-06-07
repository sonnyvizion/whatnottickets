import type { Metadata } from "next";
import { Elms_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CameraFlashes from "@/components/CameraFlashes";

const elmsSans = Elms_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-google",
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
    <html lang="fr" className={elmsSans.variable}>
      <body>
        <SmoothScroll />
<CameraFlashes />
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
