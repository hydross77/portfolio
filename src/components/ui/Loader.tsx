"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function Loader() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const kanjiRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const bar = barRef.current
    const counter = counterRef.current
    const kanji = kanjiRef.current
    if (!wrap || !bar || !counter || !kanji) return

    document.body.style.overflow = "hidden"

    let count = 0
    const tick = setInterval(() => {
      count += Math.floor(Math.random() * 4) + 1
      if (count >= 100) {
        count = 100
        clearInterval(tick)
      }
      if (counter) counter.textContent = String(count).padStart(3, "0")
    }, 30)

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ""
      },
    })

    tl.from(kanji, { opacity: 0, scale: 0.8, duration: 0.8, ease: "power3.out" })
      .to(bar, { scaleX: 1, duration: 2.2, ease: "power2.inOut" }, 0.2)
      .to(
        [counter, kanji],
        { opacity: 0, duration: 0.4, ease: "power2.in" },
        2.2
      )
      .to(wrap, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, 2.6)

    return () => clearInterval(tick)
  }, [])

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center gap-8"
    >
      <div
        ref={kanjiRef}
        className="absolute select-none pointer-events-none"
        style={{ fontSize: "clamp(160px, 25vw, 340px)", color: "rgba(255,255,255,0.04)", fontFamily: "serif", lineHeight: 1 }}
      >
        魂
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <span
          ref={counterRef}
          className="text-white/20 tabular-nums"
          style={{ fontFamily: "monospace", fontSize: "11px", letterSpacing: "6px" }}
        >
          000
        </span>

        <div className="w-48 h-px bg-white/8 overflow-hidden">
          <div
            ref={barRef}
            className="h-full bg-[#c0392b] origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        <span
          className="text-white/25 uppercase"
          style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "5px" }}
        >
          Soul Link — Initializing
        </span>
      </div>
    </div>
  )
}
