import { useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Tek_Leylek: THREE.Mesh
  }
  materials: {
    material: THREE.Material
  }
}

interface Props {
  material: THREE.Material
}

export function ModelStork(props: Props) {
  const { nodes } = useGLTF("/glb/stork-test.glb") as GLTFResult

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Tek_Leylek.geometry} rotation={[Math.PI / 2, 0, 0]} material={props.material}>
        {/* <MeshTransmissionMaterial {...materialProps} /> */}
      </mesh>
    </group>
  )
}

useGLTF.preload("/glb/stork-test.glb")
