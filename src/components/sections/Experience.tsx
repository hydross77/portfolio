"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { experience, clients } from "@/lib/data"

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const clientsRef = useRef<HTMLDivElement>(null)

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
      gsap.from(clientsRef.current?.children ?? [], {
        y: 40, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: clientsRef.current, start: "top 80%" },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
    >
      {/* BG text */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none"
        style={{ fontSize: "clamp(100px, 16vw, 220px)", color: "rgba(255,255,255,0.02)", fontFamily: "var(--font-cinzel)", lineHeight: 1 }}
      >
        EXP
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16">
        {/* Header */}
        <div ref={headerRef} className="flex items-center gap-4 mb-16">
          <span className="block w-8 h-px bg-[#c0392b]" />
          <span className="text-white/30 uppercase" style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "5px" }}>
            Expérience
          </span>
        </div>

        {/* Top grid: timeline + availability */}
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          {/* Timeline */}
          <div>
            <h2 className="mb-10 leading-tight" style={{ fontFamily: "var(--font-cinzel)", fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 700 }}>
              Là où j'ai <span style={{ color: "#c0392b" }}>œuvré.</span>
            </h2>

            <div ref={listRef} className="flex flex-col">
              {experience.map((exp, i) => (
                <div key={i} className="group flex gap-5 py-5 border-b border-white/5 last:border-b-0">
                  <div className="flex flex-col items-center pt-1 flex-shrink-0">
                    <div className={`w-1.5 h-1.5 rounded-full mt-0.5 ${exp.current ? "bg-[#c0392b]" : "bg-white/18"}`} />
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

          {/* Callout boxes */}
          <div className="flex flex-col gap-4 justify-center">
            <div className="border border-[#c0392b]/20 p-6 bg-[#c0392b]/[0.03]">
              <div className="text-[#c0392b]/60 mb-2" style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "4px" }}>DISPONIBLE</div>
              <p className="text-white/60 mb-1" style={{ fontFamily: "var(--font-body)", fontSize: "14px", lineHeight: 1.7 }}>
                Dev web, automatisation, intégration IA — je prends des missions freelance.
              </p>
              <a href="mailto:tiffany.dellmann@gmail.com" className="inline-flex items-center gap-2 text-[#c0392b]/70 hover:text-[#c0392b] text-xs uppercase tracking-widest transition-colors mt-3" style={{ fontFamily: "monospace" }}>
                Me contacter ↗
              </a>
            </div>
            <div className="border border-white/6 p-6 bg-white/[0.02]">
              <div className="text-white/22 mb-2" style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "4px" }}>VAGA STUDIO</div>
              <p className="text-white/50" style={{ fontFamily: "var(--font-body)", fontSize: "14px", lineHeight: 1.7 }}>
                Agence web indépendante. Du travail sérieux, sans les tarifs des grands groupes.
              </p>
              <a href="mailto:tiffany.dellmann@gmail.com" className="inline-flex items-center gap-2 text-white/28 hover:text-white text-xs uppercase tracking-widest transition-colors mt-3" style={{ fontFamily: "monospace" }}>
                Discutons ↗
              </a>
            </div>
          </div>
        </div>

        {/* Missions clients */}
        <div className="border-t border-white/5 pt-16">
          <div className="flex items-center gap-4 mb-10">
            <span className="block w-8 h-px bg-white/15" />
            <span className="text-white/22 uppercase" style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "5px" }}>
              Missions — Clients (confidentiel)
            </span>
          </div>

          <div ref={clientsRef} className="grid sm:grid-cols-2 xl:grid-cols-3 gap-px">
            {clients.map((client) => (
              <div
                key={client.sector}
                className="group border border-white/5 bg-white/[0.015] p-6 hover:border-white/12 hover:bg-white/[0.03] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-white/70 group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-cinzel)", fontSize: "13px", fontWeight: 700 }}>
                    {client.sector}
                  </h3>
                </div>
                <p className="text-white/35 mb-5" style={{ fontFamily: "var(--font-body)", fontSize: "13px", lineHeight: 1.75 }}>
                  {client.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {client.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 border border-white/8 text-white/30 text-xs" style={{ fontFamily: "monospace", letterSpacing: "0.5px" }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-[#c0392b]/50 group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
