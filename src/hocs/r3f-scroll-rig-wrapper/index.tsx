import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig"
import { Environment } from "@react-three/drei"
import { MutableRefObject, ReactNode, useEffect, useRef, useState } from "react"

import * as THREE from "three"

export interface R3fScrollRigWrapperProps {
  children: ReactNode
}

export default function R3fScrollRigWrapper(props: R3fScrollRigWrapperProps) {
  const eventSource = useRef<HTMLDivElement>(null)
  const [isTouch, setTouch] = useState(false)

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.maxTouchPoints > 0
    setTouch(isTouch)
  }, [])

  console.log(isTouch)

  return (
    <>
      {isTouch ? (
        <>{props.children}</>
      ) : (
        <div ref={eventSource}>
          <GlobalCanvas
            // className="relative z-10"
            gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
            eventSource={eventSource as MutableRefObject<HTMLElement>}
            eventPrefix="client"
            scaleMultiplier={0.01}
            camera={{ fov: 33 }}
            style={{ pointerEvents: "auto" }}
            // frameloop="demand"
          >
            <color attach="background" args={["#ffffff"]} />
            <ambientLight intensity={10.5} />
            <spotLight position={[14, 14, 14]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow />
            <Environment preset="city" />
          </GlobalCanvas>
          <SmoothScrollbar scrollRestoration="manual">
            {(bind) => <div {...bind}>{props.children}</div>}
          </SmoothScrollbar>
        </div>
      )}
    </>
  )
}
