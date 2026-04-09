import type { Metadata } from "next"
import { Cinzel, Space_Grotesk } from "next/font/google"
import "./globals.css"

const cinzel = Cinzel({
  variable: "--font-cinzel-var",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body-var",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "VAGA — Développeur Full-Stack & Intégrateur IA",
  description:
    "Portfolio de VAGA — développeur full-stack passionné par React, PHP, Symfony, Three.js et l'intégration d'IA.",
  keywords: ["développeur", "full-stack", "react", "php", "symfony", "three.js", "claude", "ia"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cinzel.variable} ${spaceGrotesk.variable}`}>
      <body style={{ fontFamily: "var(--font-body-var), sans-serif" }}>{children}</body>
    </html>
  )
}
