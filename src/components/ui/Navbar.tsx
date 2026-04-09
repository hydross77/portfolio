"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const links = ["About", "Experience", "Projects", "Contact"]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    gsap.from(nav, { y: -20, opacity: 0, duration: 0.8, delay: 3.2, ease: "power3.out" })

    ScrollTrigger.create({
      start: "80px top",
      onEnter: () => nav.classList.add("nav-scrolled"),
      onLeaveBack: () => nav.classList.remove("nav-scrolled"),
    })
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase())
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[999] flex items-center justify-between px-8 md:px-16 h-16 transition-all duration-500 nav"
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="text-white/80 hover:text-white transition-colors"
        style={{ fontFamily: "var(--font-cinzel)", fontSize: "13px", letterSpacing: "3px" }}
      >
        VAGA
      </button>

      <ul className="flex items-center gap-10">
        {links.map((link) => (
          <li key={link}>
            <button
              onClick={() => scrollTo(link)}
              className="text-white/40 hover:text-white transition-colors text-xs tracking-widest uppercase relative group"
              style={{ fontFamily: "monospace", letterSpacing: "3px" }}
            >
              {link}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#c0392b] transition-all duration-300 group-hover:w-full" />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
