"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { skills } from "@/lib/data"

gsap.registerPlugin(ScrollTrigger)

function TechCard({ group }: { group: { category: string; items: string[] } }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    gsap.to(card, { rotateY: x * 14, rotateX: -y * 14, duration: 0.3, ease: "power2.out", transformPerspective: 800 })
  }

  const onMouseLeave = () => {
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.5, ease: "power3.out" })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative group border border-white/6 bg-white/[0.02] p-7 transition-colors duration-300 hover:border-[#c0392b]/40 hover:bg-white/[0.04]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <h3
        className="mb-5 text-white/50 group-hover:text-white/80 transition-colors"
        style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "5px", textTransform: "uppercase" }}
      >
        {group.category}
      </h3>

      <div className="flex flex-wrap gap-2">
        {group.items.map((item) => (
          <span
            key={item}
            className="text-white/70 group-hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-body)", fontSize: "15px", fontWeight: 500 }}
          >
            {item}
            <span className="text-white/15 ml-1">/</span>
          </span>
        ))}
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: "inset 0 0 40px rgba(192,57,43,0.04)" }} />
      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 w-0 h-px bg-[#c0392b] group-hover:w-full transition-all duration-500" />
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const originRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      })
      gsap.from(originRef.current, {
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: originRef.current, start: "top 85%" },
      })
      gsap.from(gridRef.current?.children ?? [], {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 py-32 overflow-hidden"
    >
      {/* BG number */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 select-none pointer-events-none"
        style={{ fontSize: "clamp(100px, 18vw, 260px)", color: "rgba(255,255,255,0.02)", fontFamily: "var(--font-cinzel)", lineHeight: 1 }}
      >
        02
      </div>

      <div className="wrap relative z-10">
        {/* Header */}
        <div ref={headerRef}>
          <div className="flex items-center gap-4 mb-5">
            <span className="block w-8 h-px bg-[#c0392b]" />
            <span className="text-white/30 uppercase" style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "5px" }}>
              Arsenal — 02
            </span>
          </div>
          <h2 className="mb-3 leading-none" style={{ fontFamily: "var(--font-cinzel)", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, letterSpacing: "-1px" }}>
            ZANPAKUTO
          </h2>
          <p className="text-white/28 mb-16" style={{ fontFamily: "monospace", fontSize: "11px", letterSpacing: "2px" }}>
            Les outils. Les armes. Ce qui permet de construire.
          </p>
        </div>

        {/* Origin card — Slayers Online */}
        <div
          ref={originRef}
          className="relative border border-[#c0392b]/20 bg-[#c0392b]/[0.03] p-7 mb-px"
        >
          <div className="flex items-start justify-between mb-4">
            <span className="text-[#c0392b]/50 border border-[#c0392b]/20 px-2 py-0.5" style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "3px" }}>
              ORIGINE
            </span>
            <span className="text-white/20" style={{ fontFamily: "monospace", fontSize: "10px" }}>Ado</span>
          </div>
          <h3 className="mb-2" style={{ fontFamily: "var(--font-cinzel)", fontSize: "18px", fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>
            Slayers Online
          </h3>
          <p className="text-white/38 max-w-2xl" style={{ fontFamily: "var(--font-body)", fontSize: "14px", lineHeight: 1.75 }}>
            Contribution à un MMORPG 2D pixelisé en JavaScript. Premier contact avec la logique serveur, les états temps réel, la persistance. C'est ça qui a tout déclenché — pas une école, pas un tutoriel. Un jeu.
          </p>
          <div className="absolute bottom-0 left-0 w-full h-px bg-[#c0392b]/15" />
        </div>

        {/* Tech grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 xl:grid-cols-4 gap-px mt-px">
          {skills.map((group) => (
            <TechCard key={group.category} group={group} />
          ))}
        </div>
      </div>
    </section>
  )
}
