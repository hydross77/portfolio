"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { experience } from "@/lib/data"

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      })
      gsap.from(listRef.current?.children ?? [], {
        x: -40, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: listRef.current, start: "top 80%" },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative px-8 md:px-20 py-28 overflow-hidden"
    >
      {/* Bg number */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none"
        style={{ fontSize: "clamp(120px, 18vw, 240px)", color: "rgba(255,255,255,0.02)", fontFamily: "var(--font-cinzel)", lineHeight: 1 }}
      >
        EXP
      </div>

      {/* Header */}
      <div ref={headerRef} className="flex items-center gap-4 mb-16">
        <span className="block w-8 h-px bg-[#c0392b]" />
        <span className="text-white/30 uppercase" style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "5px" }}>
          Expérience
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-16 max-w-5xl">
        <div>
          <h2 className="mb-12 leading-tight" style={{ fontFamily: "var(--font-cinzel)", fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 700 }}>
            Là où j'ai <span style={{ color: "#c0392b" }}>œuvré.</span>
          </h2>

          <div ref={listRef} className="flex flex-col">
            {experience.map((exp, i) => (
              <div
                key={i}
                className="group flex gap-5 py-5 border-b border-white/5 last:border-b-0"
              >
                {/* Timeline dot */}
                <div className="flex flex-col items-center pt-1 flex-shrink-0">
                  <div className={`w-1.5 h-1.5 rounded-full mt-0.5 ${exp.current ? "bg-[#c0392b]" : "bg-white/20"}`} />
                  {i < experience.length - 1 && (
                    <div className="w-px flex-1 bg-white/5 mt-2" />
                  )}
                </div>

                <div className="pb-2">
                  <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                    <span
                      className="text-white/85 group-hover:text-white transition-colors"
                      style={{ fontFamily: "var(--font-cinzel)", fontSize: "15px", fontWeight: 700 }}
                    >
                      {exp.company}
                    </span>
                    {exp.current && (
                      <span
                        className="text-[#c0392b]/70 border border-[#c0392b]/25 px-1.5 py-0.5 text-[9px] uppercase tracking-widest"
                        style={{ fontFamily: "monospace" }}
                      >
                        Actif
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-white/30" style={{ fontFamily: "monospace", fontSize: "11px", letterSpacing: "1px" }}>
                      {exp.role}
                    </span>
                  </div>
                  <p className="text-white/38" style={{ fontFamily: "var(--font-body)", fontSize: "13px", lineHeight: 1.7 }}>
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side — callout boxes */}
        <div className="flex flex-col gap-4 justify-center">
          <div className="border border-[#c0392b]/20 p-6 bg-[#c0392b]/[0.03]">
            <div className="text-[#c0392b]/60 mb-2" style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "4px" }}>
              DISPONIBLE
            </div>
            <p className="text-white/65 mb-4" style={{ fontFamily: "var(--font-body)", fontSize: "14px", lineHeight: 1.7 }}>
              Je prends des missions freelance via MALT. Dev web, automatisation, intégration IA — contacte-moi.
            </p>
            <a
              href="https://www.malt.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#c0392b]/80 hover:text-[#c0392b] text-xs uppercase tracking-widest transition-colors"
              style={{ fontFamily: "monospace" }}
            >
              Profil MALT ↗
            </a>
          </div>

          <div className="border border-white/6 p-6 bg-white/[0.02]">
            <div className="text-white/25 mb-2" style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "4px" }}>
              AGENCE WEB
            </div>
            <p className="text-white/55 mb-3" style={{ fontFamily: "var(--font-body)", fontSize: "14px", lineHeight: 1.7 }}>
              VAGA Studio — une structure indépendante pour des clients qui veulent du travail sérieux sans les prix des grands groupes.
            </p>
            <a
              href="mailto:tiffany.dellmann@gmail.com"
              className="inline-flex items-center gap-2 text-white/30 hover:text-white text-xs uppercase tracking-widest transition-colors"
              style={{ fontFamily: "monospace" }}
            >
              Discutons ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
