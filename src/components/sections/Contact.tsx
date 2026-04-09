"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { bio, socials } from "@/lib/data"

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.children ?? [], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 py-32 overflow-hidden"
    >
      {/* Divider line */}
      <div className="absolute top-0 left-8 md:left-20 right-8 md:right-20 h-px bg-white/6" />

      {/* Background kanji */}
      <div
        className="absolute right-0 bottom-0 select-none pointer-events-none"
        style={{
          fontSize: "clamp(120px, 20vw, 300px)",
          color: "rgba(255,255,255,0.02)",
          fontFamily: "serif",
          lineHeight: 1,
        }}
      >
        繋
      </div>

      <div ref={contentRef} className="relative z-10 max-w-4xl">
        {/* Label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="block w-8 h-px bg-[#c0392b]" />
          <span
            className="text-white/30 uppercase"
            style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "5px" }}
          >
            Contact — 03
          </span>
        </div>

        {/* Big text */}
        <h2
          className="mb-6 leading-none"
          style={{ fontFamily: "var(--font-cinzel)", fontSize: "clamp(48px, 9vw, 120px)", fontWeight: 900 }}
        >
          Let's work
        </h2>
        <h2
          className="mb-16 leading-none"
          style={{
            fontFamily: "var(--font-cinzel)",
            fontSize: "clamp(48px, 9vw, 120px)",
            fontWeight: 900,
            color: "rgba(255,255,255,0.12)",
          }}
        >
          Together.
        </h2>

        {/* Email */}
        <a
          href={`mailto:${bio.email}`}
          className="group inline-flex items-center gap-3 mb-16"
          style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px, 1.5vw, 22px)" }}
        >
          <span className="text-white/60 group-hover:text-white transition-colors duration-300">
            {bio.email}
          </span>
          <span className="w-0 h-px bg-[#c0392b] group-hover:w-12 transition-all duration-400" />
        </a>

        {/* Socials */}
        <div className="flex items-center gap-10">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white text-xs uppercase tracking-widest transition-colors duration-300 relative group"
              style={{ fontFamily: "monospace" }}
            >
              {s.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c0392b] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 left-8 md:left-20 right-8 md:right-20 flex items-center justify-between">
        <span
          className="text-white/15"
          style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "2px" }}
        >
          © {new Date().getFullYear()} VAGA — All rights reserved
        </span>
        <span
          className="text-white/10"
          style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "2px" }}
        >
          Built with Next.js + Three.js
        </span>
      </div>
    </section>
  )
}
