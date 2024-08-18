import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomGeometryParticles = (props: any) => {
  const { count, shape } = props

  // This reference gives us direct access to our points
  const points = useRef<THREE.Points>(null)

  // Generate our positions attributes array
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)

    if (shape === "box") {
      for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * 2
        const y = (Math.random() - 0.5) * 2
        const z = (Math.random() - 0.5) * 2

        positions.set([x, y, z], i * 3)
      }
    }

    if (shape === "sphere") {
      const distance = 1

      for (let i = 0; i < count; i++) {
        const theta = THREE.MathUtils.randFloatSpread(360)
        const phi = THREE.MathUtils.randFloatSpread(360)

        const x = distance * Math.sin(theta) * Math.cos(phi)
        const y = distance * Math.sin(theta) * Math.sin(phi)
        const z = distance * Math.cos(theta)

        positions.set([x, y, z], i * 3)
      }
    }

    return positions
  }, [count, shape])

  useFrame((state) => {
    if (!points.current) return
    const { clock } = state

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      points.current.geometry.attributes.position.array[i3] += Math.sin(clock.elapsedTime + Math.random() * 10) * 0.001
      points.current.geometry.attributes.position.array[i3 + 1] +=
        Math.cos(clock.elapsedTime + Math.random() * 10) * 0.001
      points.current.geometry.attributes.position.array[i3 + 2] +=
        Math.sin(clock.elapsedTime + Math.random() * 10) * 0.001
    }

    points.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={points} scale={1.5}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={2.15} color="#F05D21" sizeAttenuation depthWrite={false} />
    </points>
  )
}

export { CustomGeometryParticles }
