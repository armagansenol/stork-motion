import s from "./home.module.scss"

import { ScrollSceneChildProps, UseCanvas, ViewportScrollScene } from "@14islands/r3f-scroll-rig"
import { Environment, PerspectiveCamera, SpotLight, Text } from "@react-three/drei"
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber"
import cx from "clsx"
import { MutableRefObject, useRef, useState } from "react"
import { Link } from "react-router-dom"
import * as THREE from "three"
import { AmbientLight } from "three"
extend({ AmbientLight, SpotLight, Canvas })

import { useAll as getAllProjects } from "@/api/queries/projects-home"
import { useAll as getAllServices } from "@/api/queries/services"
import { CardProject } from "@/components/card-project"
import { FormContact } from "@/components/form-contact"
import Header from "@/components/header"
import { IframeVideo } from "@/components/iframe-video"
import { ModelStork } from "@/components/model-stork"
import DefaultLayout from "@/layouts/default"
import VideoModal from "@/components/video-modal"

export default function Home() {
  const { data: projects } = getAllProjects()
  const { data: services } = getAllServices()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <DefaultLayout>
      <Header />
      <section className={cx("grid grid-cols-12 px-4 lg:px-10 xl:px-20 pt-4 lg:pt-10 pb-12 lg:pb-32 items-center")}>
        <div className="col-span-12 lg:col-span-6 pr-0 lg:pr-10 xl:pr-12 2xl:pr-40 order-2 lg:order-1 pt-8 lg:pt-0">
          <p className="font-manrope text-2xl lg:text-2xl xl:text-4xl font-thin leading-snug lg:leading-loose xl:leading-normal text-center lg:text-left">
            We are Stork Motion, a design studio dedicated to crafting extraordinary experiences through innovation and
            creativity.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-6 xl:pl-24 order-1 lg:order-2">
          <div
            className={cx(s.videoC, "w-full aspect-square rounded-2xl lg:rounded-3xl overflow-hidden cursor-pointer")}
            onClick={() => setIsOpen(true)}
          >
            <IframeVideo
              aspectRatio="100%"
              src="https://player.vimeo.com/video/1076773063?background=1&badge=0&autoplay=1&muted=1&loop=1&player_id=0&app_id=58479"
            />
          </div>
        </div>
      </section>
      <section className={cx(s.whatWeDo, "flex flex-col items-center")}>
        <div className={cx(s.text, "text-center flex flex-col items-center")}>
          <h2>WHAT WE DO</h2>
          <ul>
            {services &&
              services.map((item) => {
                return (
                  <li key={item.id}>
                    <p>{item.title}</p>
                  </li>
                )
              })}
          </ul>
        </div>
      </section>
      <section className={cx(s.selectedWorks, "flex flex-col items-stretch")}>
        <h2 className="tablet:hidden">SELECTED WORKS</h2>
        <div className={cx(s.selectedWorksTitleC, "hidden tablet:block")}>
          <SelectedWorksSection />
        </div>
        <p>Dive into our extensive portfolio of completed projects to see the magic of 3D motion design in action.</p>
        <div className={s.items}>
          {projects &&
            projects.map((item, i) => {
              return (
                <div className={s.cardC} key={i}>
                  <CardProject {...item} mediaClassName={s.homeMediaC} titleSize="lg" />
                </div>
              )
            })}
        </div>
        <Link className={s.moreWorks} to="/works">
          MORE WORKS
        </Link>
      </section>
      <section className={s.contactForm}>
        <FormContact />
      </section>
      <VideoModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </DefaultLayout>
  )
}

function SelectedWorksSection() {
  const el = useRef<HTMLDivElement>(null)
  return (
    <>
      <div ref={el} className="Placeholder ViewportScrollScene"></div>
      <UseCanvas>
        <ViewportScrollScene track={el as MutableRefObject<HTMLElement>} hideOffscreen={false}>
          {(props) => <SelectedWorksWebGL {...props} />}
        </ViewportScrollScene>
      </UseCanvas>
    </>
  )
}

function SelectedWorksWebGL({
  scale,
  scrollState,
}: {
  scale: ScrollSceneChildProps["scale"]
  scrollState: ScrollSceneChildProps["scrollState"]
}) {
  const mesh = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!mesh.current) return
    mesh.current.rotation.y = scrollState.progress * Math.PI * 2
  })

  return (
    <>
      <group scale={scale.xy.min() * 0.5}>
        <group ref={mesh} scale={0.00007} position={[0, 0, 0]} onPointerEnter={() => console.log("lol")}>
          <ModelStork
            material={
              new THREE.MeshPhysicalMaterial({
                metalness: 1,
                roughness: 0.2,
                reflectivity: 1,
                clearcoat: 0.5,
                clearcoatRoughness: 0.1,
                envMapIntensity: 1.5,
                color: "#F05D21",
              })
            }
          />
        </group>
        <group scale={0.02} position={[0, 0, 0]}>
          <CanvasText />
        </group>
      </group>
      <PerspectiveCamera
        position={[0, 0, 20]}
        makeDefault
        onUpdate={(self) => {
          self.lookAt(0, 0, 0)
        }}
      />
      <ambientLight intensity={1} />
      <Environment preset="studio" />
      <Rig />
    </>
  )
}

// function BasicScrollScene() {
//   const el = useRef<HTMLDivElement>(null)
//   return (
//     <>
//       <div ref={el} className="Placeholder ScrollScene pointer-events-none"></div>
//       <UseCanvas style={{ pointerEvents: "none" }}>
//         <ViewportScrollScene track={el as MutableRefObject<HTMLElement>}>
//           {(props) => <Hero {...props} />}
//         </ViewportScrollScene>
//       </UseCanvas>
//     </>
//   )
// }

function CanvasText() {
  const { viewport } = useThree()
  const vw = viewport.width * 100

  return (
    <Text
      position={[0, 0, -1]}
      font="/fonts/Anton/Anton-Regular.ttf"
      fontSize={vw > 1024 ? 1 : 1}
      lineHeight={1}
      color="#F05D21"
      anchorX="center"
      anchorY="middle"
      fillOpacity={1}
      textAlign="center"
      material-toneMapped={false} // Disables tone mapping for this material
      material-color="white"
    >
      {`SELECTED\nWORKS`}
    </Text>
  )
}

function Rig() {
  const { camera, pointer } = useThree()
  const vec = new THREE.Vector3()

  return useFrame(() => {
    camera.position.lerp(vec.set(pointer.x * -2, pointer.y * -2, camera.position.z), 0.09)
    camera.lookAt(0, 0, 0)
  })
}
