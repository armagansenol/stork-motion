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

import { CardProject } from "@/components/card-project"
import Video from "@/components/custom-video"
import { FormContact } from "@/components/form-contact"
import DefaultLayout from "@/layouts/default"

import { useAll as getAllProjects } from "@/api/queries/projects-home"
import { useAll as getAllServices } from "@/api/queries/services"
import Header from "@/components/header"
import IntroMorph from "@/components/intro-morph"
import { ModelStork } from "@/components/model-stork"
// @ts-expect-error: Unreachable code error
import { StickyScrollScene } from "@14islands/r3f-scroll-rig/powerups"
import { JSX } from "react/jsx-runtime"

export default function Home() {
  const { data: projects } = getAllProjects()
  const { data: services } = getAllServices()

  // const selectedWorks = [
  //   {
  //     title: "Test 1",
  //     mediaType: MediaType.image,
  //     mediaSrc: "/img/sample.jpg",
  //     categories: [
  //       { ui: "Branding", type: "BRANDING" },
  //       { ui: "Web Design & Development", type: "WEB_DESIGN_AND_DEVELOPMENT" },
  //       { ui: "Motion Design", type: "MOTION_DESIGN" },
  //     ],
  //     url: "lol",
  //   },
  // ]

  // const categories = [
  //   {
  //     title: "BRANDING",
  //     id: "1",
  //   },
  // ]

  return (
    <DefaultLayout>
      <Header className="tablet:hidden" />

      <section className={cx(s.hero, "pin-wrapper")}>
        <Header />
        <SpinningBoxSection />
      </section>

      <section className={cx(s.info, "flex flex-col items-center")}>
        <p>
          We are Stork Motion, a design studio dedicated to crafting extraordinary experiences through innovation and
          creativity.
        </p>
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
                  <CardProject {...item} mediaClassName={s.homeMediaC} />
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

function SpinningBoxSection() {
  const el = useRef<HTMLDivElement>(null)
  return (
    <div className="StickyContainer">
      <div ref={el} className="SomeDomContent Debug"></div>
      <UseCanvas>
        <StickyScrollScene track={el as MutableRefObject<HTMLElement>}>
          {(props: JSX.IntrinsicAttributes) => <IntroMorph {...props} />}
        </StickyScrollScene>
      </UseCanvas>
    </div>
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
              // new THREE.MeshPhysicalMaterial({
              //   transparent: true,
              //   opacity: 0.25,
              //   transmission: 1,
              //   roughness: 0.05,
              //   metalness: 0,
              //   reflectivity: 1,
              //   ior: 1.45,
              //   clearcoat: 0.8,
              //   clearcoatRoughness: 0,
              //   color: 0xffffff,
              //   thickness: 0.5,
              //   envMapIntensity: 2,
              // })
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
