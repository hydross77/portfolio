"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { socials } from "@/lib/data"

gsap.registerPlugin(ScrollTrigger)

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

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
    <div className="flex items-center gap-4 mb-10">
      {revealed ? (
        <a
          ref={numRef}
          href="https://wa.me/33615431256"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 text-white/55 hover:text-[#25D366] transition-colors duration-300"
          style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px, 1.4vw, 20px)" }}
        >
          <span className="text-[#25D366]/60 group-hover:text-[#25D366] transition-colors">
            <WhatsAppIcon />
          </span>
          <span className="tracking-widest">06 15 43 12 56</span>
          <span className="block w-0 h-px bg-[#25D366] group-hover:w-10 transition-all duration-500" />
        </a>
      ) : (
        <button
          onClick={reveal}
          className="group inline-flex items-center gap-3"
          style={{ fontFamily: "monospace", fontSize: "12px", letterSpacing: "3px" }}
        >
          <span className="text-white/20 group-hover:text-white/35 transition-colors duration-300 flex items-center gap-2">
            <span className="text-white/15"><WhatsAppIcon /></span>
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

      <div
        className="absolute right-0 bottom-0 select-none pointer-events-none"
        style={{ fontSize: "clamp(120px, 20vw, 300px)", color: "rgba(255,255,255,0.018)", fontFamily: "serif", lineHeight: 1 }}
      >
        繋
      </div>

      <div ref={contentRef} className="relative z-10" style={{ width: "100%", maxWidth: "1280px", marginLeft: "auto", marginRight: "auto", paddingLeft: "clamp(1.5rem, 7vw, 8rem)", paddingRight: "clamp(1.5rem, 7vw, 8rem)" }}>
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

        {/* Phone — WhatsApp reveal */}
        <PhoneReveal />

        {/* Socials */}
        <div className="flex items-center gap-10 mb-16">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/28 hover:text-white text-xs uppercase tracking-widest transition-colors duration-300 relative group inline-flex items-center gap-2"
              style={{ fontFamily: "monospace" }}
            >
              {s.label === "WhatsApp" && <span className="opacity-50 group-hover:opacity-100 transition-opacity"><WhatsAppIcon /></span>}
              {s.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c0392b] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* No LinkedIn */}
        <p className="text-white/15 border-l-2 border-white/8 pl-4 max-w-md" style={{ fontFamily: "monospace", fontSize: "10px", lineHeight: 1.8, letterSpacing: "1px" }}>
          Pas de LinkedIn. Les réseaux corporate ne sont pas mon truc.
        </p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-between" style={{ paddingLeft: "clamp(1.5rem, 7vw, 8rem)", paddingRight: "clamp(1.5rem, 7vw, 8rem)" }}>
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
