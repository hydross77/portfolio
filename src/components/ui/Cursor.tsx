"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0
    let mouseY = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.05, ease: "none" })
      gsap.to(ring, { x: mouseX, y: mouseY, duration: 0.2, ease: "power2.out" })
    }

    const onEnter = () => {
      gsap.to(dot, { scale: 2.5, backgroundColor: "#c0392b", duration: 0.25 })
      gsap.to(ring, { scale: 1.8, borderColor: "rgba(192,57,43,0.6)", duration: 0.25 })
    }

    const onLeave = () => {
      gsap.to(dot, { scale: 1, backgroundColor: "#c0392b", duration: 0.25 })
      gsap.to(ring, { scale: 1, borderColor: "rgba(255,255,255,0.35)", duration: 0.25 })
    }

    const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.1 })
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.1 })

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mousedown", onDown)
    document.addEventListener("mouseup", onUp)

    const interactives = document.querySelectorAll("a, button, [data-cursor]")
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter)
      el.addEventListener("mouseleave", onLeave)
    })

    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("mouseup", onUp)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#c0392b] pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-white/35 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  )
}
