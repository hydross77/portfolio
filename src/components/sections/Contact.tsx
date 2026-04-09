"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { bio, socials } from "@/lib/data"

gsap.registerPlugin(ScrollTrigger)

function PhoneReveal() {
  const [revealed, setRevealed] = useState(false)
  const numRef = useRef<HTMLAnchorElement>(null)

  const reveal = () => {
    setRevealed(true)
    if (numRef.current) {
      gsap.from(numRef.current, { opacity: 0, y: 6, duration: 0.4, ease: "power3.out" })
    }
  }

  return (
    <div className="inline-flex items-center gap-4 mb-6">
      {revealed ? (
        <a
          ref={numRef}
          href="tel:+33615431256"
          className="group inline-flex items-center gap-3"
          style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px, 1.4vw, 20px)" }}
        >
          <span className="text-white/55 group-hover:text-white transition-colors duration-300 tracking-widest">
            06 15 43 12 56
          </span>
          <span className="block w-0 h-px bg-[#c0392b] group-hover:w-10 transition-all duration-500" />
        </a>
      ) : (
        <button
          onClick={reveal}
          className="group inline-flex items-center gap-3"
          style={{ fontFamily: "monospace", fontSize: "12px", letterSpacing: "3px" }}
        >
          <span className="text-white/20 group-hover:text-white/40 transition-colors duration-300">
            ••• •• •• •• ••
          </span>
          <span
            className="text-[#c0392b]/50 group-hover:text-[#c0392b] border border-[#c0392b]/20 group-hover:border-[#c0392b]/50 px-2 py-0.5 transition-all duration-300"
            style={{ fontSize: "9px", letterSpacing: "2px" }}
          >
            RÉVÉLER
          </span>
        </button>
      )}
    </div>
  )
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.children ?? [], {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />

      {/* Background kanji */}
      <div
        className="absolute right-0 bottom-0 select-none pointer-events-none"
        style={{ fontSize: "clamp(120px, 20vw, 300px)", color: "rgba(255,255,255,0.018)", fontFamily: "serif", lineHeight: 1 }}
      >
        繋
      </div>

      <div ref={contentRef} className="wrap relative z-10">
        {/* Label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="block w-8 h-px bg-[#c0392b]" />
          <span className="text-white/30 uppercase" style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "5px" }}>
            Contact — 03
          </span>
        </div>

        {/* Big text */}
        <h2 className="mb-4 leading-none" style={{ fontFamily: "var(--font-cinzel)", fontSize: "clamp(48px, 9vw, 110px)", fontWeight: 900 }}>
          Let's work
        </h2>
        <h2 className="mb-14 leading-none" style={{ fontFamily: "var(--font-cinzel)", fontSize: "clamp(48px, 9vw, 110px)", fontWeight: 900, color: "rgba(255,255,255,0.1)" }}>
          Together.
        </h2>

        {/* Email */}
        <a
          href={`mailto:${bio.email}`}
          className="group inline-flex items-center gap-4 mb-5"
          style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px, 1.4vw, 20px)" }}
        >
          <span className="text-white/55 group-hover:text-white transition-colors duration-300">
            {bio.email}
          </span>
          <span className="block w-0 h-px bg-[#c0392b] group-hover:w-10 transition-all duration-500" />
        </a>

        {/* Phone — hidden by default */}
        <PhoneReveal />

        {/* Socials */}
        <div className="flex items-center gap-10 mt-10 mb-16">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel={s.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="text-white/28 hover:text-white text-xs uppercase tracking-widest transition-colors duration-300 relative group"
              style={{ fontFamily: "monospace" }}
            >
              {s.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c0392b] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* No LinkedIn */}
        <p className="text-white/15 border-l-2 border-white/8 pl-4 max-w-md" style={{ fontFamily: "monospace", fontSize: "10px", lineHeight: 1.8, letterSpacing: "1px" }}>
          Pas de LinkedIn. Les réseaux corporate ne sont pas mon truc.<br />
          Mon travail parle pour moi — regarde ce que je construis.
        </p>
      </div>

      {/* Footer */}
      <div className="wrap absolute bottom-8 left-0 right-0 flex items-center justify-between">
        <span className="text-white/12" style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "2px" }}>
          © {new Date().getFullYear()} VAGA
        </span>
        <span className="text-white/8" style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "2px" }}>
          Autodidacte depuis l'adolescence.
        </span>
      </div>
    </section>
  )
}
