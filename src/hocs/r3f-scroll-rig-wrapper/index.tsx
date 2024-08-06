import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig"
import { Environment } from "@react-three/drei"
import { EffectComposer, WaterEffect } from "@react-three/postprocessing"
import { MutableRefObject, ReactNode, useEffect, useRef, useState } from "react"

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
            // gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
            eventSource={eventSource as MutableRefObject<HTMLElement>}
            eventPrefix="client"
            // scaleMultiplier={0.01}
            // camera={{ fov: 33 }}
            style={{ pointerEvents: "none" }}
            // frameloop="demand"
            // globalRender={false}
          >
            <ambientLight intensity={10.5} />
            <spotLight position={[14, 14, 14]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow />
            <Environment preset="city" />
            <EffectComposer>
              {/* <HueSaturation saturation={-0.2} /> */}
              {/* <BrightnessContrast brightness={0} contrast={0.25} /> */}
              <WaterEffect factor={0.75} />
              {/* <TiltShift2 samples={6} blur={0.4} /> */}
              {/* <Bloom mipmapBlur luminanceThreshold={0} intensity={5} /> */}
              {/* <ToneMapping /> */}
            </EffectComposer>
          </GlobalCanvas>
          <SmoothScrollbar scrollRestoration="manual">
            {(bind) => <div {...bind}>{props.children}</div>}
          </SmoothScrollbar>
        </div>
      )}
    </>
  )
}
