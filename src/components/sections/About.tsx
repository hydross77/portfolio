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
      className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 py-32 overflow-hidden"
    >
      {/* Section number BG */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none"
        style={{ fontSize: "clamp(120px, 20vw, 280px)", color: "rgba(255,255,255,0.02)", fontFamily: "var(--font-cinzel)", lineHeight: 1 }}
      >
        01
      </div>

      {/* Label */}
      <div className="flex items-center gap-4 mb-16">
        <span className="block w-8 h-px bg-[#c0392b]" />
        <span className="text-white/30 uppercase" style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "5px" }}>
          À propos
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-16 max-w-5xl">
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

          {/* LinkedIn disclaimer */}
          <p
            className="mt-8 text-white/20 border-l-2 border-[#c0392b]/30 pl-4"
            style={{ fontFamily: "monospace", fontSize: "11px", lineHeight: 1.7 }}
          >
            LinkedIn? Non. Les réseaux sociaux corporate ne me correspondent pas.<br />
            Si tu veux me connaître — regarde ce que je construis.
          </p>
        </div>

        {/* Right: emblem */}
        <div ref={rightRef} className="flex items-center justify-center">
          <div className="relative w-60 h-60">
            <div className="absolute inset-0 rounded-full border border-white/6" />
            <div className="absolute inset-4 rounded-full border border-white/4" />
            <div className="absolute inset-8 rounded-full border border-[#c0392b]/15" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span style={{ fontFamily: "serif", fontSize: "88px", color: "rgba(255,255,255,0.1)" }}>卍</span>
            </div>
            {["I", "V", "X", "XIII"].map((n, i) => {
              const angle = i * 90 - 90
              const rad = (angle * Math.PI) / 180
              const r = 106
              return (
                <span
                  key={n}
                  className="absolute text-white/12"
                  style={{
                    fontFamily: "var(--font-cinzel)", fontSize: "9px",
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
    </section>
  )
}
