"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef } from "react"
import gsap from "gsap"

const Scene = dynamic(() => import("@/components/canvas/Scene"), { ssr: false })

export default function Hero() {
  const labelRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const roleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const kanjiRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const delay = 3.2

    const tl = gsap.timeline({ delay })

    tl.from(labelRef.current, { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" })

    if (titleRef.current) {
      const spans = titleRef.current.querySelectorAll("span")
      tl.from(spans, { y: "110%", duration: 0.9, ease: "power4.out", stagger: 0.08 }, "-=0.3")
    }

    tl.from(roleRef.current, { y: 16, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
    tl.from(subRef.current, { y: 16, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
    tl.from(ctaRef.current?.children ?? [], { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }, "-=0.3")

    gsap.from(kanjiRef.current, { opacity: 0, scale: 0.88, duration: 2, delay: delay + 0.4, ease: "power3.out" })

    if (scrollRef.current) {
      gsap.from(scrollRef.current, { opacity: 0, duration: 0.6, delay: delay + 1.5 })
      gsap.to(scrollRef.current.querySelector(".scroll-line"), {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.2,
        repeat: -1,
        ease: "power2.inOut",
        delay: delay + 1.5,
      })
    }
  }, [])

  return (
    <section id="home" className="relative w-full h-screen flex items-center overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.75) 100%)" }}
      />

      {/* Background Kanji */}
      <div
        ref={kanjiRef}
        className="absolute right-[5vw] top-1/2 -translate-y-1/2 select-none pointer-events-none z-[2]"
        style={{
          fontSize: "clamp(200px, 30vw, 500px)",
          color: "rgba(255,255,255,0.022)",
          fontFamily: "serif",
          lineHeight: 1,
        }}
      >
        死神
      </div>

      {/* Vertical line decor */}
      <div className="absolute top-0 bottom-0 w-px bg-white/[0.04] z-[2]" style={{ left: "8vw" }} />

      {/* Content */}
      <div className="wrap relative z-10">
        {/* Label */}
        <div ref={labelRef} className="flex items-center gap-4 mb-8">
          <span className="block w-8 h-px bg-[#c0392b]" />
          <span
            className="text-white/35 uppercase"
            style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "5px" }}
          >
            Portfolio
          </span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-black leading-none mb-5 overflow-hidden"
          style={{ fontFamily: "var(--font-cinzel)", fontSize: "clamp(72px, 14vw, 200px)" }}
        >
          <div className="overflow-hidden">
            <span className="block" style={{ transform: "translateY(110%)" }}>
              VAGA
            </span>
          </div>
        </h1>

        {/* Role */}
        <p
          ref={roleRef}
          className="mb-3"
          style={{
            fontFamily: "var(--font-cinzel)",
            fontSize: "clamp(13px, 1.3vw, 18px)",
            color: "rgba(192,57,43,0.75)",
            letterSpacing: "3px",
          }}
        >
          Builder. Automatiseur. Cerveau en surchauffe.
        </p>

        {/* Tagline */}
        <p
          ref={subRef}
          className="text-white/40 mb-12 max-w-lg"
          style={{ fontFamily: "var(--font-body)", fontSize: "clamp(13px, 1.2vw, 17px)", lineHeight: 1.75 }}
        >
          I eat bugs for breakfast and ship features for lunch.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex items-center gap-6 flex-wrap">
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-3 px-7 py-3 bg-[#c0392b] text-white text-xs uppercase tracking-widest transition-all duration-300 hover:bg-white hover:text-[#0a0a0a]"
            style={{ fontFamily: "monospace" }}
          >
            Voir les projets
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
          <a
            href="https://wa.me/33615431256"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/35 hover:text-white text-xs uppercase tracking-widest transition-colors duration-300 border-b border-white/15 pb-px hover:border-white"
            style={{ fontFamily: "monospace" }}
          >
            WhatsApp
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <div className="scroll-line w-px h-14 bg-white/15 origin-top" />
        <span
          className="text-white/20 uppercase"
          style={{ fontFamily: "monospace", fontSize: "8px", letterSpacing: "4px" }}
        >
          Scroll
        </span>
      </div>
    </section>
  )
}
