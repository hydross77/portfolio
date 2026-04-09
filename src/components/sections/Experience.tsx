"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { experience, clients } from "@/lib/data"

gsap.registerPlugin(ScrollTrigger)

const WRAP: React.CSSProperties = {
  width: "100%",
  maxWidth: "1280px",
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: "clamp(1.5rem, 7vw, 8rem)",
  paddingRight: "clamp(1.5rem, 7vw, 8rem)",
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // opacity only — no transform, aucun clip possible
      gsap.from(headerRef.current, {
        opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      })
      gsap.from(Array.from(listRef.current?.children ?? []), {
        opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: listRef.current, start: "top 80%", once: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28"
    >
      {/* BG text — clippé par overflow sur son propre conteneur */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none overflow-hidden"
        style={{ fontSize: "clamp(100px, 16vw, 220px)", color: "rgba(255,255,255,0.02)", fontFamily: "var(--font-cinzel)", lineHeight: 1 }}
      >
        EXP
      </div>

      <div className="relative z-10" style={WRAP}>
        {/* Header */}
        <div ref={headerRef} className="flex items-center gap-4 mb-16">
          <span className="block w-8 h-px bg-[#c0392b]" />
          <span className="text-white/30 uppercase" style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "5px" }}>
            Expérience
          </span>
        </div>

        {/* Timeline + callouts */}
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="mb-10 leading-tight" style={{ fontFamily: "var(--font-cinzel)", fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 700 }}>
              Là où j'ai <span style={{ color: "#c0392b" }}>œuvré.</span>
            </h2>

            <div ref={listRef} className="flex flex-col">
              {experience.map((exp, i) => (
                <div key={i} className="group flex gap-5 py-5 border-b border-white/5 last:border-b-0">
                  <div className="flex flex-col items-center pt-1 flex-shrink-0">
                    <div className={`w-1.5 h-1.5 rounded-full mt-0.5 flex-shrink-0 ${exp.current ? "bg-[#c0392b]" : "bg-white/18"}`} />
                    {i < experience.length - 1 && <div className="w-px flex-1 bg-white/5 mt-2" />}
                  </div>
                  <div className="pb-2">
                    <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                      <span className="text-white/80 group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-cinzel)", fontSize: "14px", fontWeight: 700 }}>
                        {exp.company}
                      </span>
                      {exp.current && (
                        <span className="text-[#c0392b]/70 border border-[#c0392b]/25 px-1.5 py-0.5 text-[9px] uppercase tracking-widest" style={{ fontFamily: "monospace" }}>
                          Actif
                        </span>
                      )}
                    </div>
                    <p className="text-white/30 mb-2" style={{ fontFamily: "monospace", fontSize: "11px", letterSpacing: "1px" }}>{exp.role}</p>
                    <p className="text-white/38" style={{ fontFamily: "var(--font-body)", fontSize: "13px", lineHeight: 1.7 }}>{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 justify-center">
            <div className="border border-[#c0392b]/20 p-6" style={{ background: "rgba(192,57,43,0.03)" }}>
              <div className="text-[#c0392b]/60 mb-2" style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "4px" }}>DISPONIBLE</div>
              <p className="text-white/60 mb-3" style={{ fontFamily: "var(--font-body)", fontSize: "14px", lineHeight: 1.7 }}>
                Dev web, automatisation, intégration IA — je prends des missions freelance.
              </p>
              <a href="https://wa.me/33615431256" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#c0392b]/70 hover:text-[#c0392b] text-xs uppercase tracking-widest transition-colors"
                style={{ fontFamily: "monospace" }}>
                WhatsApp ↗
              </a>
            </div>
            <div className="border border-white/6 p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="text-white/22 mb-2" style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "4px" }}>AURYX</div>
              <p className="text-white/50" style={{ fontFamily: "var(--font-body)", fontSize: "14px", lineHeight: 1.7 }}>
                Collectif de passionnés. On construit des projets web entre amis, à côté.
              </p>
              <a href="https://auryx.fr" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/28 hover:text-white text-xs uppercase tracking-widest transition-colors mt-3"
                style={{ fontFamily: "monospace" }}>
                auryx.fr ↗
              </a>
            </div>
          </div>
        </div>

        {/* Missions clients — toujours visibles, pas d'animation GSAP */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "4rem" }}>
          <div className="flex items-center gap-4 mb-10">
            <span className="block w-8 h-px" style={{ background: "rgba(255,255,255,0.15)" }} />
            <span className="text-white/22 uppercase" style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "5px" }}>
              Missions — Clients (confidentiel)
            </span>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3" style={{ gap: "1px" }}>
            {clients.map((client) => (
              <div
                key={client.sector}
                className="relative group transition-all duration-300"
                style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.015)", padding: "1.5rem" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
              >
                <h3 className="mb-3" style={{ fontFamily: "var(--font-cinzel)", fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>
                  {client.sector}
                </h3>
                <p className="mb-5" style={{ fontFamily: "var(--font-body)", fontSize: "13px", lineHeight: 1.75, color: "rgba(255,255,255,0.38)" }}>
                  {client.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {client.tags.map((tag) => (
                    <span key={tag} style={{ fontFamily: "monospace", fontSize: "11px", letterSpacing: "0.5px", padding: "2px 8px", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Accent line */}
                <div
                  className="absolute bottom-0 left-0 h-px transition-all duration-500 w-0 group-hover:w-full"
                  style={{ background: "rgba(192,57,43,0.5)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
