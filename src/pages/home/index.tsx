import s from "./home.module.scss"

import { ScrollSceneChildProps, UseCanvas, ViewportScrollScene } from "@14islands/r3f-scroll-rig"
import { Environment, PerspectiveCamera, SpotLight, Text } from "@react-three/drei"
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber"
import cx from "clsx"
import { MutableRefObject, useRef } from "react"
import { Link } from "react-router-dom"
import * as THREE from "three"
import { AmbientLight } from "three"
extend({ AmbientLight, SpotLight, Canvas })

import { useAll as getAllProjects } from "@/api/queries/projects-home"
import { useAll as getAllServices } from "@/api/queries/services"
import { CardProject } from "@/components/card-project"
import Video from "@/components/custom-video"
import { FormContact } from "@/components/form-contact"
import Header from "@/components/header"
import Hero from "@/components/hero"
import { ModelStork } from "@/components/model-stork"
import DefaultLayout from "@/layouts/default"

export default function Home() {
  const { data: projects } = getAllProjects()
  const { data: services } = getAllServices()

  return (
    <DefaultLayout>
      <Header />
      <section className={cx(s.hero)}>
        <BasicScrollScene />
      </section>
      <section className={cx(s.info, "flex flex-col items-center")}>
        <p>
          We are Stork Motion, a design studio dedicated to crafting extraordinary experiences through innovation and
          creativity.
        </p>
      </section>
      <section className="w-full h-screen relative overflow-hidden">
        <div
          className="absolute inset-0 bg-slate-300"
          style={{
            position: "relative",
            paddingBottom: "56.25%" /* 16:9 Aspect Ratio */,
            height: 0,
            overflow: "hidden",
          }}
        >
          <iframe
            src="https://player.vimeo.com/video/1058139461?background=1&badge=0&amp;autoplay=1&amp;muted=1&amp;loop=1&amp;player_id=0&amp;app_id=58479"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "100%",
              height: "100%",
              transform: "translate(-50%, -50%)",
              objectFit: "cover",
              minWidth: "100%",
              minHeight: "100%",
            }}
          ></iframe>
        </div>
      </section>
      <section
        className={cx(s.whatWeDo, "grid grid-rows-[auto_auto] grid-cols-12 tablet:grid-rows-1 gap-0 tablet:gap-20")}
      >
        <div className={cx(s.text, "col-span-12 tablet:col-span-5")}>
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
        <div className="col-span-12 tablet:col-span-7">
          <div className={s.videoC}>
            <Video src="/video/sample.mp4" />
          </div>
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

function BasicScrollScene() {
  const el = useRef<HTMLDivElement>(null)
  return (
    <>
      <div ref={el} className="Placeholder ScrollScene pointer-events-none"></div>
      <UseCanvas style={{ pointerEvents: "none" }}>
        <ViewportScrollScene track={el as MutableRefObject<HTMLElement>}>
          {(props) => <Hero {...props} />}
        </ViewportScrollScene>
      </UseCanvas>
    </>
  )
}

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
