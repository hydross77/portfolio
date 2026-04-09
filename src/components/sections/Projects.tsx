"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { projects } from "@/lib/data"

gsap.registerPlugin(ScrollTrigger)

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (project.classified) return
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    gsap.to(card, { rotateY: x * 14, rotateX: -y * 14, duration: 0.3, ease: "power2.out", transformPerspective: 800 })
  }

  const onMouseLeave = () => {
    if (project.classified) return
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.5, ease: "power3.out" })
  }

  if (project.classified) {
    return (
      <div
        ref={cardRef}
        className="relative border border-white/4 bg-white/[0.01] p-8 select-none"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 4px)",
          }}
        />
        <div className="flex items-start justify-between mb-8">
          <span className="text-white/8" style={{ fontFamily: "var(--font-cinzel)", fontSize: "36px", fontWeight: 900, lineHeight: 1 }}>
            {project.id}
          </span>
          <span className="text-[#c0392b]/30 border border-[#c0392b]/20 px-2 py-0.5" style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "3px" }}>
            CLASSIFIÉ
          </span>
        </div>
        <h3
          className="mb-4"
          style={{ fontFamily: "var(--font-cinzel)", fontSize: "22px", fontWeight: 700, color: "rgba(255,255,255,0.12)" }}
        >
          {project.title}
        </h3>
        <p style={{ fontFamily: "monospace", fontSize: "12px", color: "rgba(255,255,255,0.15)", letterSpacing: "2px" }}>
          Dossier scellé. Accès refusé.
        </p>
        {/* Lock icon */}
        <div className="mt-10 text-white/8 text-4xl select-none">⊘</div>
      </div>
    )
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative group border border-white/6 bg-white/[0.02] p-8 transition-colors duration-300 hover:border-[#c0392b]/40 hover:bg-white/[0.04]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="flex items-start justify-between mb-8">
        <span className="text-white/12" style={{ fontFamily: "var(--font-cinzel)", fontSize: "36px", fontWeight: 900, lineHeight: 1 }}>
          {project.id}
        </span>
        <span className="text-white/22" style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "3px" }}>
          {project.year}
        </span>
      </div>

      <h3 className="mb-4 text-white" style={{ fontFamily: "var(--font-cinzel)", fontSize: "clamp(20px, 2vw, 26px)", fontWeight: 700 }}>
        {project.title}
      </h3>

      <p className="text-white/42 leading-relaxed mb-8" style={{ fontFamily: "var(--font-body)", fontSize: "14px", lineHeight: 1.75 }}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.tech.map((t) => (
          <span key={t} className="px-2.5 py-1 border border-white/10 text-white/35 text-xs" style={{ fontFamily: "monospace", letterSpacing: "1px" }}>
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-6">
        {project.github !== "#" && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/35 hover:text-white text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
            style={{ fontFamily: "monospace" }}
          >
            GitHub ↗
          </a>
        )}
        {project.demo !== "#" && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c0392b]/60 hover:text-[#c0392b] text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
            style={{ fontFamily: "monospace" }}
          >
            Live ↗
          </a>
        )}
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: "inset 0 0 40px rgba(192,57,43,0.04)" }} />
      <div className="absolute bottom-0 left-0 w-0 h-px bg-[#c0392b] group-hover:w-full transition-all duration-500" />
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      })
      gsap.from(gridRef.current?.children ?? [], {
        y: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 py-32 overflow-hidden">
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 select-none pointer-events-none"
        style={{ fontSize: "clamp(120px, 20vw, 280px)", color: "rgba(255,255,255,0.02)", fontFamily: "var(--font-cinzel)", lineHeight: 1 }}
      >
        02
      </div>

      <div ref={headerRef} className="flex items-center gap-4 mb-16 relative z-10">
        <span className="block w-8 h-px bg-[#c0392b]" />
        <span className="text-white/30 uppercase" style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "5px" }}>
          Projets
        </span>
      </div>

      <h2 className="mb-4 max-w-xl relative z-10" style={{ fontFamily: "var(--font-cinzel)", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 700 }}>
        Ce que j'ai <span style={{ color: "#c0392b" }}>forgé.</span>
      </h2>
      <p className="text-white/25 mb-16 relative z-10" style={{ fontFamily: "monospace", fontSize: "11px", letterSpacing: "2px" }}>
        La plupart des dossiers sont scellés. C'est normal.
      </p>

      <div ref={gridRef} className="grid md:grid-cols-2 xl:grid-cols-3 gap-px relative z-10">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
