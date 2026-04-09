"use client"

import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

const COUNT = 1800

export default function Particles() {
  const meshRef = useRef<THREE.Points>(null)
  const { mouse } = useThree()

  const [geometry, velocities] = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const sizes = new Float32Array(COUNT)
    const opacities = new Float32Array(COUNT)
    const vels = new Float32Array(COUNT * 3)

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8

      sizes[i] = Math.random() * 2.5 + 0.5
      opacities[i] = Math.random() * 0.6 + 0.1

      vels[i * 3] = (Math.random() - 0.5) * 0.002
      vels[i * 3 + 1] = Math.random() * 0.004 + 0.001
      vels[i * 3 + 2] = (Math.random() - 0.5) * 0.001
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute("opacity", new THREE.BufferAttribute(opacities, 1))

    return [geo, vels]
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array
    const t = state.clock.elapsedTime

    // Subtle mouse influence
    const mx = mouse.x * 0.3
    const my = mouse.y * 0.3

    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] += velocities[i * 3] + Math.sin(t * 0.3 + i * 0.01) * 0.0005 + mx * 0.0002
      pos[i * 3 + 1] += velocities[i * 3 + 1]
      pos[i * 3 + 2] += velocities[i * 3 + 2]

      // Wrap Y
      if (pos[i * 3 + 1] > 9) pos[i * 3 + 1] = -9
      // Wrap X
      if (pos[i * 3] > 12) pos[i * 3] = -12
      if (pos[i * 3] < -12) pos[i * 3] = 12
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true
    meshRef.current.rotation.y = t * 0.008
  })

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color("#e8f0ff"),
        size: 0.04,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  )

  return <points ref={meshRef} geometry={geometry} material={material} />
}
