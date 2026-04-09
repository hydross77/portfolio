"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { skills, bio } from "@/lib/data"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      })
      gsap.from(rightRef.current, {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      })
      gsap.from(skillsRef.current?.children ?? [], {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: skillsRef.current, start: "top 80%" },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 py-32 overflow-hidden"
    >
      {/* Section number */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none"
        style={{
          fontSize: "clamp(120px, 20vw, 280px)",
          color: "rgba(255,255,255,0.02)",
          fontFamily: "var(--font-cinzel)",
          lineHeight: 1,
        }}
      >
        01
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-16">
        <span className="block w-8 h-px bg-[#c0392b]" />
        <span
          className="text-white/30 uppercase"
          style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "5px" }}
        >
          À propos
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-16 max-w-5xl">
        {/* Left: text */}
        <div ref={leftRef}>
          <h2
            className="mb-8 leading-tight"
            style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 700,
            }}
          >
            Construire ce qui<br />
            <span style={{ color: "#c0392b" }}>n'existe pas encore.</span>
          </h2>
          <p
            className="text-white/55 leading-relaxed mb-6"
            style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px, 1.2vw, 17px)" }}
          >
            {bio.intro}
          </p>
          <p
            className="text-white/40 leading-relaxed"
            style={{ fontFamily: "var(--font-body)", fontSize: "clamp(13px, 1vw, 15px)" }}
          >
            Passionné par la frontière entre technique et créativité, je travaille aussi bien sur des
            architectures backend robustes que sur des expériences frontend qui captivent. L'IA n'est pas
            un buzzword pour moi — c'est un outil que j'intègre concrètement dans les projets.
          </p>
        </div>

        {/* Right: emblem */}
        <div ref={rightRef} className="flex items-center justify-center">
          <div className="relative w-56 h-56">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-white/8" />
            <div className="absolute inset-3 rounded-full border border-white/5" />
            <div className="absolute inset-6 rounded-full border border-[#c0392b]/20" />
            {/* Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                style={{
                  fontFamily: "serif",
                  fontSize: "80px",
                  color: "rgba(255,255,255,0.12)",
                }}
              >
                卍
              </span>
            </div>
            {/* Roman numerals around */}
            {["I", "V", "X", "XIII"].map((n, i) => {
              const angle = i * 90 - 90
              const rad = (angle * Math.PI) / 180
              const r = 100
              return (
                <span
                  key={n}
                  className="absolute text-white/15"
                  style={{
                    fontFamily: "var(--font-cinzel)",
                    fontSize: "10px",
                    left: `calc(50% + ${Math.cos(rad) * r}px - 8px)`,
                    top: `calc(50% + ${Math.sin(rad) * r}px - 8px)`,
                    letterSpacing: "1px",
                  }}
                >
                  {n}
                </span>
              )
            })}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div ref={skillsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mt-20">
        {skills.map((group) => (
          <div key={group.category}>
            <h3
              className="text-white/30 uppercase mb-3"
              style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "4px" }}
            >
              {group.category}
            </h3>
            <ul className="flex flex-col gap-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="text-white/60 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-body)", fontSize: "13px" }}
                >
                  <span className="w-1 h-1 rounded-full bg-[#c0392b] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
