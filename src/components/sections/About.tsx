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
        x: -60, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      })
      gsap.from(rightRef.current, {
        x: 60, opacity: 0, duration: 1, ease: "power3.out", delay: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      })
      gsap.from(skillsRef.current?.children ?? [], {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: skillsRef.current, start: "top 80%" },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center py-32 overflow-hidden"
    >
      {/* Section number BG */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none"
        style={{ fontSize: "clamp(120px, 20vw, 280px)", color: "rgba(255,255,255,0.02)", fontFamily: "var(--font-cinzel)", lineHeight: 1 }}
      >
        01
      </div>

      <div className="relative z-10" style={{ width: "100%", maxWidth: "1280px", marginLeft: "auto", marginRight: "auto", paddingLeft: "clamp(1.5rem, 7vw, 8rem)", paddingRight: "clamp(1.5rem, 7vw, 8rem)" }}>
        {/* Label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="block w-8 h-px bg-[#c0392b]" />
          <span className="text-white/30 uppercase" style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "5px" }}>
            À propos
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left */}
          <div ref={leftRef}>
            <h2
              className="mb-8 leading-tight"
              style={{ fontFamily: "var(--font-cinzel)", fontSize: "clamp(30px, 3.5vw, 48px)", fontWeight: 700 }}
            >
              Construire ce qui<br />
              <span style={{ color: "#c0392b" }}>n'existe pas encore.</span>
            </h2>

            <p className="text-white/55 leading-relaxed mb-5" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px, 1.1vw, 16px)", lineHeight: 1.85 }}>
              {bio.intro}
            </p>
            <p className="text-white/38 leading-relaxed" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(13px, 1vw, 15px)", lineHeight: 1.85 }}>
              {bio.about}
            </p>
          </div>

          {/* Right: emblem SVG */}
          <div ref={rightRef} className="flex items-center justify-center">
            <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
              <circle cx="120" cy="120" r="115" stroke="white" strokeOpacity="0.06" strokeWidth="1"/>
              <circle cx="120" cy="120" r="96" stroke="white" strokeOpacity="0.04" strokeWidth="1"/>
              <circle cx="120" cy="120" r="72" stroke="#c0392b" strokeOpacity="0.18" strokeWidth="1"/>
              <circle cx="120" cy="120" r="48" stroke="white" strokeOpacity="0.05" strokeWidth="1"/>
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * 45 * Math.PI) / 180
                const x1 = 120 + Math.cos(angle) * 52
                const y1 = 120 + Math.sin(angle) * 52
                const x2 = 120 + Math.cos(angle) * 94
                const y2 = 120 + Math.sin(angle) * 94
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeOpacity="0.06" strokeWidth="1"/>
              })}
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i * 15 * Math.PI) / 180
                const isMain = i % 6 === 0
                const r1 = isMain ? 108 : 112
                const x1 = 120 + Math.cos(angle) * r1
                const y1 = 120 + Math.sin(angle) * r1
                const x2 = 120 + Math.cos(angle) * 115
                const y2 = 120 + Math.sin(angle) * 115
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeOpacity={isMain ? 0.12 : 0.05} strokeWidth="1"/>
              })}
              {([["I", 120, 18], ["V", 222, 124], ["X", 120, 228], ["XIII", 8, 124]] as [string, number, number][]).map(([label, x, y]) => (
                <text key={label} x={x} y={y} textAnchor="middle" fill="white" fillOpacity="0.12"
                  style={{ fontFamily: "serif", fontSize: "9px", letterSpacing: "1px" }}>
                  {label}
                </text>
              ))}
              <circle cx="120" cy="120" r="3" fill="#c0392b" fillOpacity="0.4"/>
              <circle cx="120" cy="120" r="8" stroke="#c0392b" strokeOpacity="0.15" strokeWidth="1" fill="none"/>
            </svg>
          </div>
        </div>

        {/* Skills */}
        <div ref={skillsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="text-white/25 uppercase mb-3" style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "4px" }}>
                {group.category}
              </h3>
              <ul className="flex flex-col gap-1.5">
                {group.items.map((item) => (
                  <li key={item} className="text-white/55 flex items-center gap-2" style={{ fontFamily: "var(--font-body)", fontSize: "13px" }}>
                    <span className="w-1 h-1 rounded-full bg-[#c0392b] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
