"use client"

import { Canvas } from "@react-three/fiber"
import { Preload } from "@react-three/drei"
import Particles from "./Particles"

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 65 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[4, 4, 4]} intensity={0.8} color="#c0392b" />
      <pointLight position={[-4, -2, 2]} intensity={0.4} color="#1a4a8a" />
      <Particles />
      <Preload all />
    </Canvas>
  )
}
