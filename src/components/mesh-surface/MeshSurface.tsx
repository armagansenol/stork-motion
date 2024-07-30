import { OrbitControls, PerspectiveCamera, Sampler } from "@react-three/drei"
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber"
import { Bloom, EffectComposer } from "@react-three/postprocessing"
import { perlin3 } from "maath/dist/declarations/src/random/noise"
import { RenderPass } from "postprocessing"
import { useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js"
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js"

extend({ EffectComposer, RenderPass, Bloom })

type Sparkle = {
  position: THREE.Vector3
  velocity: THREE.Vector3
  size: number
  slowDown: number
  color: THREE.Color
  update: () => void
}

function createSparkle(origin: THREE.Vector3, color: THREE.Color): Sparkle {
  const velocity = new THREE.Vector3(
    THREE.MathUtils.randFloat(0.001, 0.006) * (Math.random() > 0.5 ? 1 : -1),
    THREE.MathUtils.randFloat(0.001, 0.006) * (Math.random() > 0.5 ? 1 : -1),
    THREE.MathUtils.randFloat(0.001, 0.006) * (Math.random() > 0.5 ? 1 : -1)
  )
  const size = Math.random() * 4 + 0.5
  const slowDown = 0.4 + Math.random() * 0.58

  return {
    position: origin.clone(),
    velocity,
    size,
    slowDown,
    color,
    update() {
      if (velocity.length() > 0.001) {
        this.position.add(this.velocity)
        this.velocity.multiplyScalar(this.slowDown)
      }
    },
  }
}

type SparklesProps = {
  sparkles: Sparkle[]
}

const Sparkles: React.FC<SparklesProps> = ({ sparkles }) => {
  // Calculate positions from sparkles data
  const positions = useMemo(() => {
    const array = new Float32Array(sparkles.length * 3)
    sparkles.forEach((sparkle, i) => {
      array[i * 3] = sparkle.position.x
      array[i * 3 + 1] = sparkle.position.y
      array[i * 3 + 2] = sparkle.position.z
    })
    return array
  }, [sparkles])

  const colors = useMemo(() => {
    const array = new Float32Array(sparkles.length * 3)
    sparkles.forEach((s, i) => {
      array[i * 3] = s.color.r
      array[i * 3 + 1] = s.color.g
      array[i * 3 + 2] = s.color.b
    })
    return array
  }, [sparkles])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={sparkles.length} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} count={sparkles.length} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        sizeAttenuation
        map={new THREE.TextureLoader().load("dotTexture.png")}
        transparent
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

type Star = {
  position: THREE.Vector3
  size: number
  phi: number
  theta: number
  velocity: THREE.Vector2
  color: THREE.Color
  update: () => void
}

function createStar(color: THREE.Color): Star {
  const size = Math.random() * 4 + 0.5
  const phi = Math.random() * Math.PI * 2
  const theta = Math.random() * Math.PI
  const velocity = new THREE.Vector2().random().subScalar(0.5).multiplyScalar(0.0007)

  const position = new THREE.Vector3(
    size * Math.sin(phi) * Math.sin(theta),
    size * Math.cos(phi),
    size * Math.sin(phi) * Math.cos(theta)
  )

  const star: Star = {
    position,
    size,
    phi,
    theta,
    velocity,
    color,
    update() {
      this.phi += this.velocity.x
      this.theta += this.velocity.y
      this.position.set(
        this.size * Math.sin(this.phi) * Math.sin(this.theta),
        this.size * Math.cos(this.phi),
        this.size * Math.sin(this.phi) * Math.cos(this.theta)
      )
    },
  }

  return star
}
type GalaxyProps = {
  stars: Star[]
}

const Galaxy: React.FC<GalaxyProps> = ({ stars }) => {
  // Calculate positions and colors from stars data
  const positions = useMemo(() => {
    const array = new Float32Array(stars.length * 3)
    stars.forEach((star, i) => {
      array[i * 3] = star.position.x
      array[i * 3 + 1] = star.position.y
      array[i * 3 + 2] = star.position.z
    })
    return array
  }, [stars])

  const colors = useMemo(() => {
    const array = new Float32Array(stars.length * 3)
    stars.forEach((star, i) => {
      array[i * 3] = star.color.r
      array[i * 3 + 1] = star.color.g
      array[i * 3 + 2] = star.color.b
    })
    return array
  }, [stars])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={stars.length} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} count={stars.length} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors sizeAttenuation />
    </points>
  )
}

const Scene = () => {
  const { scene, camera } = useThree()
  const [whale, setWhale] = useState<THREE.Mesh | null>(null)
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  const [stars, setStars] = useState<Star[]>([])
  const groupRef = useRef<THREE.Group>(null)
  const composerRef = useRef<typeof EffectComposer>(null)

  useEffect(() => {
    new OBJLoader().load(
      "/obj/Whale_Model.obj",
      (obj) => {
        const mesh = obj.children[0] as THREE.Mesh
        mesh.geometry.scale(0.3, 0.3, 0.3)
        mesh.geometry.translate(0, -2, 0)
        mesh.geometry.rotateY(0.2)
        setWhale(mesh)
      },
      undefined,
      (err) => console.error("An error occurred", err)
    )
  }, [])

  useEffect(() => {
    if (whale) {
      const sampler = new MeshSurfaceSampler(whale).build()
      const newSparkles = Array.from({ length: 1000 }, () =>
        createSparkle(new THREE.Vector3(), new THREE.Color(`hsl(${Math.random() * 360}, 100%, 50%)`))
      )
      const newStars = Array.from({ length: 1500 }, () =>
        createStar(new THREE.Color(`hsl(${Math.random() * 360}, 100%, 50%)`))
      )

      // Initialize a target position vector
      const targetPosition = new THREE.Vector3()

      // Sample points for sparkles
      newSparkles.forEach((sparkle) => {
        sampler.sample(targetPosition)
        sparkle.position.copy(targetPosition)
      })

      // Update state with sampled data
      setSparkles(newSparkles)
      setStars(newStars)
    }
  }, [whale])

  useFrame(() => {
    setSparkles((prevSparkles) =>
      prevSparkles.map((sparkle) => {
        sparkle.update()
        return sparkle
      })
    )

    setStars((prevStars) =>
      prevStars.map((star) => {
        star.update()
        return star
      })
    )

    composerRef.current?.render()
  })




  return (
    <>
      <EffectComposer ref={composerRef}>
        <renderPass scene={scene} camera={camera} />
        <Bloom
          //   args={[new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85]}
          attach="passes"
          mipmapBlur
          luminanceThreshold={0}
          intensity={0.6}
        />
      </EffectComposer>

      <Sampler
        weight={"normal"} // the name of the attribute to be used as sampling weight
        transform={whale, 3)}
      >
        <group ref={groupRef}>
          {/* {whale && <primitive object={whale} />} */}
          <Sparkles sparkles={sparkles} />
          <Galaxy stars={stars} />
        </group>

        <instancedMesh args={[null, null, 1_000]}>
          <sphereGeometry args={[0.1]} />
        </instancedMesh>
      </Sampler>

      <OrbitControls />
    </>
  )
}

const MeshSurface = () => {
  return (
    <Canvas gl={{ pixelRatio: 1 }} camera={{ position: [0, 0, 8], fov: 60, near: 0.001, far: 50 }}>
      <PerspectiveCamera
        fov={60}
        aspect={window.innerWidth / window.innerHeight}
        near={0.001}
        far={50}
        position={[0, 0, 8]}
      />
      <Scene />
      <color attach="background" args={["#ffffff"]} />
      <ambientLight intensity={1.5} />
    </Canvas>
  )
}

export default MeshSurface
