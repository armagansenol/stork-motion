import { gsap, ScrollTrigger } from "@/lib/gsap"
import { ScrollSceneChildProps } from "@14islands/r3f-scroll-rig"
import { OrthographicCamera, Stats, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import * as React from "react"
import * as THREE from "three"
import { GLTF } from "three-stdlib"
import { MeshSurfaceSampler } from "three/addons/math/MeshSurfaceSampler.js"
import { shaderOptions } from "./misc/shaderOptions"
import { useGSAP } from "@gsap/react"

type GLTFResult = GLTF & {
  nodes: {
    Tek_Leylek: THREE.Mesh
  }
  materials: {
    ["diffuse_Black.004"]: THREE.MeshPhysicalMaterial
  }
}

export default function IntroMorph({
  scale,
  scrollState,
}: {
  scale: ScrollSceneChildProps["scale"]
  scrollState: ScrollSceneChildProps["scrollState"]
}) {
  console.log(scale, scrollState)

  return <Scene />
}

function Scene() {
  return (
    <>
      <OrthographicCamera makeDefault position={[0, 0, 10]} near={0.1} zoom={300} />

      <ambientLight intensity={12.2} />
      <directionalLight castShadow position={[20, 20, 20]} intensity={0.11} />
      <pointLight position={[20, 0, 20]} intensity={10} />

      <React.Suspense fallback={null}>
        <Geometry />
      </React.Suspense>
      {/* <OrbitControls /> */}
      <Stats />
    </>
  )
}

function Geometry() {
  const rotationPower = 0.01
  const groupRef = React.useRef<THREE.Group | null>(null)
  const meshRef = React.useRef<THREE.Points | null>(null)

  const { nodes } = useGLTF("/glb/stork-test.glb") as GLTFResult

  useGSAP(() => {
    function getGeometryPosition(geometry: THREE.BufferGeometry) {
      const numParticles = 100000
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

      const tl = gsap
        .timeline()
        .to(meshRef.current.material.uniforms.u_sec1, {
          value: 1.0,
        })
        .to(meshRef.current.material.uniforms.u_sec2, {
          value: 1.0,
        })

      ScrollTrigger.create({
        animation: tl,
        trigger: ".pin-wrapper",
        start: "top top",
        end: "bottom+=600px bottom",
        markers: true,
        scrub: true,
        pin: true,
      })
    }

    setMesh()
    setScroll()

    console.log(meshRef.current)
  }, [nodes.Tek_Leylek.geometry])

  useFrame(() => {
    if (!groupRef.current) return

    // groupRef.current.rotation.x += rotationPower
    // groupRef.current.rotation.y += rotationPower
    groupRef.current.rotation.z += rotationPower
  })

  return (
    <>
      <group ref={groupRef} rotation={new THREE.Euler(Math.PI * 2 * 0.2, 0, Math.PI * 2 * 0.2)}></group>
    </>
  )
}
