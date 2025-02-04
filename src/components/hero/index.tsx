import { useFBO } from "@react-three/drei"
import { createPortal, extend, useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"

import fragmentShader from "@/assets/shaders/default/fragmentShader.glsl"
import vertexShader from "@/assets/shaders/default/vertexShader.glsl"
import { ScrollSceneChildProps } from "@14islands/r3f-scroll-rig"
import SimulationMaterial from "./SimulationMaterial"

extend({ SimulationMaterial })

declare module "@react-three/fiber" {
  interface ThreeElements {
    simulationMaterial: JSX.IntrinsicElements["shaderMaterial"] & {
      ref?: React.RefObject<SimulationMaterial>
      args?: [number]
    }
  }
}

const FBOParticles = () => {
  const size = 512

  const points = useRef<THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>>(null!)
  const simulationMaterialRef = useRef<SimulationMaterial>(null!)

  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1)
  const positions = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0])
  const uvs = new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0])

  const renderTarget = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    stencilBuffer: false,
    type: THREE.FloatType,
  })

  const particlesPosition = useMemo(() => {
    const length = size * size
    const particles = new Float32Array(length * 3)
    for (let i = 0; i < length; i++) {
      const i3 = i * 3
      particles[i3 + 0] = (i % size) / size
      particles[i3 + 1] = i / size / size
    }
    return particles
  }, [size])

  const uniforms = useMemo(
    () => ({
      uPositions: {
        value: null,
      },
    }),
    []
  )

  useFrame((state) => {
    const { gl, clock } = state

    gl.setRenderTarget(renderTarget)
    gl.clear()
    gl.render(scene, camera)
    gl.setRenderTarget(null)

    points.current.material.uniforms.uPositions.value = renderTarget.texture
    points.current.rotation.y = clock.elapsedTime * 0.1
    points.current.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.1

    simulationMaterialRef.current.uniforms.uTime.value = clock.elapsedTime * 0.5
  })

  return (
    <>
      {createPortal(
        <mesh>
          <simulationMaterial ref={simulationMaterialRef} args={[size]} />
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
            <bufferAttribute attach="attributes-uv" count={uvs.length / 2} array={uvs} itemSize={2} />
          </bufferGeometry>
        </mesh>,
        scene
      )}
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
        />
      </points>
    </>
  )
}

const Scene = ({
  scale,
  scrollState,
}: {
  scale: ScrollSceneChildProps["scale"]
  scrollState: ScrollSceneChildProps["scrollState"]
}) => {
  const mesh = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!mesh.current) return
    mesh.current.rotation.y = scrollState.progress * Math.PI * 2
  })

  return (
    <group ref={mesh} scale={scale.xy.min() * 0.3} position-y={scale.xy.min() * 0.1}>
      <ambientLight intensity={0.5} />
      <FBOParticles />
    </group>
  )
}

export default Scene
