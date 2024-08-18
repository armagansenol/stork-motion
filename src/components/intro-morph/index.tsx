import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"
import { OrthographicCamera, Stats, useGLTF } from "@react-three/drei"
import * as React from "react"
import * as THREE from "three"
import { GLTF } from "three-stdlib"
import { MeshSurfaceSampler } from "three/addons/math/MeshSurfaceSampler.js"
import { shaderOptions } from "./misc/shaderOptions"

type GLTFResult = GLTF & {
  nodes: {
    Tek_Leylek: THREE.Mesh
  }
  materials: {
    ["diffuse_Black.004"]: THREE.MeshPhysicalMaterial
  }
}

export default function IntroMorph() {
  return <Scene />
}

function Scene() {
  return (
    <>
      <OrthographicCamera makeDefault position={[0, 0, 100]} near={0.1} zoom={300} />

      <React.Suspense fallback={null}>
        <Geometry />
        {/* <CustomGeometryParticles count={8000} shape="sphere" /> */}
      </React.Suspense>
      <Stats />
    </>
  )
}

function Geometry() {
  // const rotationPower = 0.01
  const rotateRef = React.useRef<THREE.Group | null>(null)
  const groupRef = React.useRef<THREE.Group | null>(null)
  const meshRef = React.useRef<THREE.Points | null>(null)
  const fullCircle = Math.PI

  const { nodes } = useGLTF("/glb/stork-test.glb") as GLTFResult

  useGSAP(() => {
    function getGeometryPosition(geometry: THREE.BufferGeometry) {
      const numParticles = 50000
      const material = new THREE.MeshBasicMaterial()
      const mesh = new THREE.Mesh(geometry, material)
      const sampler = new MeshSurfaceSampler(mesh).build()
      const particlesPosition = new Float32Array(numParticles * 3)
      for (let i = 0; i < numParticles; i++) {
        const newPosition = new THREE.Vector3()
        const normal = new THREE.Vector3()

        sampler.sample(newPosition, normal)
        particlesPosition.set([newPosition.x, newPosition.y, newPosition.z], i * 3)
      }

      return particlesPosition
    }

    function setMesh() {
      const geometry = new THREE.BufferGeometry()
      const firstPos = getGeometryPosition(new THREE.SphereGeometry(1, 32, 32))
      const secPos = getGeometryPosition(nodes.Tek_Leylek.geometry)

      const scaleFactor = 0.01 // Adjust the scale factor as needed
      for (let i = 0; i < secPos.length; i += 3) {
        secPos[i] *= scaleFactor // Scale X
        secPos[i + 1] *= scaleFactor // Scale Y
        secPos[i + 2] *= scaleFactor // Scale Z
      }

      const material = new THREE.RawShaderMaterial({
        vertexShader: shaderOptions.vertex,
        fragmentShader: shaderOptions.fragment,
        uniforms: shaderOptions.uniforms,
        transparent: true,
        blending: THREE.AdditiveBlending,
      })

      geometry.setAttribute("position", new THREE.BufferAttribute(firstPos, 3))
      geometry.setAttribute("secPosition", new THREE.BufferAttribute(secPos, 3))

      meshRef.current = new THREE.Points(geometry, material)

      groupRef.current?.add(meshRef.current)
    }

    function setScroll() {
      if (!meshRef.current) return
      if (!rotateRef.current) return

      const tl = gsap
        .timeline()
        // @ts-expect-error: Unreachable code error
        .to(meshRef.current.material.uniforms.u_sec1, {
          value: 1.0,
        })
        .to(
          rotateRef.current.rotation,
          {
            z: 0,
            y: fullCircle * 0.2,
            x: 0,
            duration: 1,
          },
          "s"
        )

      ScrollTrigger.create({
        animation: tl,
        trigger: ".pin-wrapper",
        start: "center center",
        end: "top+=4500px bottom",
        markers: true,
        scrub: true,
        pin: true,
      })
    }

    setMesh()
    setScroll()
  }, [nodes.Tek_Leylek.geometry])

  return (
    <group ref={rotateRef}>
      <group ref={groupRef} rotation={new THREE.Euler(fullCircle * 0.5, 0, fullCircle * 0.5)}></group>
    </group>
  )
}
