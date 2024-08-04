import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei"
import { useControls } from "leva"
import * as THREE from "three"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Tek_Leylek: THREE.Mesh
  }
  materials: {
    ["diffuse_Black.004"]: THREE.MeshPhysicalMaterial
  }
}

export function ModelStork(props: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF("/glb/stork.glb") as GLTFResult

  const materialProps = useControls("stork", {
    transmissionSampler: true,
    backside: false,
    samples: { value: 10, min: 1, max: 32, step: 1 },
    resolution: { value: 512, min: 256, max: 2048, step: 256 },
    transmission: { value: 1, min: 0, max: 1 },
    metalness: { value: 0, min: 0, max: 1 },
    roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
    thickness: { value: 3.5, min: 0, max: 10, step: 0.01 },
    ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
    chromaticAberration: { value: 0.06, min: 0, max: 1 },
    anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 1, min: 0, max: 1 },
    attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
    attenuationColor: "#ffffff",
    color: "#ffffff",
    bg: "#ffffff",
  })

  return (
    <group {...props} dispose={null}>
      <mesh receiveShadow castShadow geometry={nodes.Tek_Leylek.geometry} rotation={[Math.PI / 2, 0, 0]}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  )
}

useGLTF.preload("/glb/stork.glb")
