import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei"
import { useControls } from "leva"
import * as THREE from "three"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Asset_1_1: THREE.Mesh
    Asset_1_2: THREE.Mesh
    Asset_1_3: THREE.Mesh
    Asset_1_4: THREE.Mesh
    Asset_1_5: THREE.Mesh
    Asset_1_6: THREE.Mesh
    Asset_1_7: THREE.Mesh
    Asset_1_8: THREE.Mesh
  }
  materials: {
    material0: THREE.MeshPhysicalMaterial
    material1: THREE.MeshPhysicalMaterial
    material2: THREE.MeshPhysicalMaterial
    material3: THREE.MeshPhysicalMaterial
    material4: THREE.MeshPhysicalMaterial
    material5: THREE.MeshPhysicalMaterial
    material6: THREE.MeshPhysicalMaterial
    material7: THREE.MeshPhysicalMaterial
  }
}

export function LuckLuckLogoModel(props: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF("/glb/luck-luck-logo.glb") as GLTFResult

  const materialProps = useControls("logo", {
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
    <>
      <group {...props} dispose={null} scale={0.02}>
        <group rotation={[Math.PI / 2, 0, Math.PI / 1]}>
          <mesh castShadow receiveShadow geometry={nodes.Asset_1_1.geometry}>
            <MeshTransmissionMaterial {...materialProps} />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.Asset_1_2.geometry}>
            <MeshTransmissionMaterial {...materialProps} />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.Asset_1_3.geometry}>
            <MeshTransmissionMaterial {...materialProps} />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.Asset_1_4.geometry}>
            <MeshTransmissionMaterial {...materialProps} />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.Asset_1_5.geometry}>
            <MeshTransmissionMaterial {...materialProps} />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.Asset_1_6.geometry}>
            <MeshTransmissionMaterial {...materialProps} />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.Asset_1_7.geometry}>
            <MeshTransmissionMaterial {...materialProps} />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.Asset_1_8.geometry}>
            <MeshTransmissionMaterial {...materialProps} />
          </mesh>
        </group>
      </group>
    </>
  )
}

useGLTF.preload("/glb/luck-luck-logo.glb")
