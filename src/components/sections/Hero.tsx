"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef } from "react"
import gsap from "gsap"

const Scene = dynamic(() => import("@/components/canvas/Scene"), { ssr: false })

const TITLE_LINES = ["VAGA"]

export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const kanjiRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const delay = 3.2 // after loader

    const tl = gsap.timeline({ delay })

    if (labelRef.current)
      tl.from(labelRef.current, { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" })

    if (titleRef.current) {
      const spans = titleRef.current.querySelectorAll("span")
      tl.from(spans, { y: "110%", duration: 0.9, ease: "power4.out", stagger: 0.08 }, "-=0.3")
    }

    if (subRef.current)
      tl.from(subRef.current, { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")

    if (ctaRef.current)
      tl.from(ctaRef.current.children, { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }, "-=0.3")

    if (kanjiRef.current)
      gsap.from(kanjiRef.current, { opacity: 0, scale: 0.85, duration: 2, delay: delay + 0.4, ease: "power3.out" })

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
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.7) 100%)" }}
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
          letterSpacing: "-0.05em",
        }}
      >
        死神
      </div>

      {/* Horizontal line decor */}
      <div className="absolute top-0 left-0 w-px h-full bg-white/5 z-[2]" style={{ left: "8vw" }} />

      {/* Content */}
      <div ref={wrapRef} className="relative z-10 px-8 md:px-20 max-w-6xl w-full">
        {/* Label */}
        <div
          ref={labelRef}
          className="flex items-center gap-4 mb-8"
        >
          <span className="block w-8 h-px bg-[#c0392b]" />
          <span
            className="text-white/40 uppercase"
            style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "5px" }}
          >
            Développeur Full-Stack & Intégrateur IA
          </span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-black leading-none mb-6 overflow-hidden"
          style={{ fontFamily: "var(--font-cinzel)", fontSize: "clamp(72px, 14vw, 200px)" }}
        >
          {TITLE_LINES.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <span className="block" style={{ transform: "translateY(110%)" }}>
                {line}
              </span>
            </div>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subRef}
          className="text-white/45 mb-12 max-w-md"
          style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px, 1.4vw, 18px)", lineHeight: 1.7 }}
        >
          I eat bugs for breakfast and ship features for lunch.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex items-center gap-6">
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-3 px-7 py-3 bg-[#c0392b] text-white text-xs uppercase tracking-widest transition-all duration-300 hover:bg-white hover:text-[#0a0a0a]"
            style={{ fontFamily: "monospace" }}
          >
            Voir les projets
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
          <a
            href="https://github.com/hydross77"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white text-xs uppercase tracking-widest transition-colors duration-300 border-b border-white/20 pb-px hover:border-white"
            style={{ fontFamily: "monospace" }}
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <div
          className="scroll-line w-px h-14 bg-white/20 origin-top"
          style={{ transformOrigin: "top" }}
        />
        <span
          className="text-white/25 uppercase"
          style={{ fontFamily: "monospace", fontSize: "8px", letterSpacing: "4px" }}
        >
          Scroll
        </span>
      </div>
    </section>
  )
}
