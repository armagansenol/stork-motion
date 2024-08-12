import { ModelStork } from "@/components/model-stork"
import { ScrollSceneChildProps, UseCanvas, ViewportScrollScene } from "@14islands/r3f-scroll-rig"
import { Environment, OrthographicCamera } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { MutableRefObject, useRef } from "react"
import * as THREE from "three"

export default function SilverStork() {
  const el = useRef<HTMLDivElement>(null)
  return (
    <>
      <div ref={el} className="Placeholder ViewportScrollScene"></div>
      <UseCanvas>
        <ViewportScrollScene track={el as MutableRefObject<HTMLElement>} hideOffscreen={false}>
          {(props) => <Scene {...props} />}
        </ViewportScrollScene>
      </UseCanvas>
    </>
  )
}

function Scene({
  scale,
  scrollState,
}: {
  scale: ScrollSceneChildProps["scale"]
  scrollState: ScrollSceneChildProps["scrollState"]
}) {
  const mesh = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!mesh.current) return
    mesh.current.rotation.y = scrollState.progress * Math.PI * 2 * 0.5
  })

  return (
    <>
      <group scale={scale.xy.min() * 0.5}>
        <group ref={mesh} scale={0.006} position={[0, 0, 0]}>
          <ModelStork
            material={
              new THREE.MeshPhysicalMaterial({
                metalness: 1,
                roughness: 0.2,
                reflectivity: 1,
                clearcoat: 0.5,
                clearcoatRoughness: 0.1,
                envMapIntensity: 1.5,
                color: 0xaaaaaa,
              })
            }
          />
        </group>
      </group>

      <ambientLight intensity={4} />

      <Environment preset="studio" />

      <OrthographicCamera
        position={[0, 0, 300]}
        makeDefault
        onUpdate={(self) => {
          self.lookAt(0, 0, 0)
        }}
      />
    </>
  )
}
