import s from "./home.module.scss"

import { ScrollScene, ScrollSceneChildProps, UseCanvas } from "@14islands/r3f-scroll-rig"
import { MeshTransmissionMaterial, PresentationControls, SpotLight, Text, useGLTF } from "@react-three/drei"
import { Canvas, extend, ThreeElements, useFrame, useThree } from "@react-three/fiber"
import cx from "clsx"
import { useControls } from "leva"
import { easing } from "maath"
import { useRef } from "react"
import { Link } from "react-router-dom"
import { AmbientLight } from "three"
import * as THREE from "three"
extend({ AmbientLight, SpotLight, Canvas })

import { CardProject } from "@/components/card-project"
import Video from "@/components/custom-video"
import { FormContact } from "@/components/form-contact"
import DefaultLayout from "@/layouts/default"

import { useAll as getAllProjects } from "@/api/queries/projects-home"
import { useAll as getAllServices } from "@/api/queries/services"

export default function Home() {
  const { data: projects } = getAllProjects()
  const { data: services } = getAllServices()

  console.log(projects, services)

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
      <section className={cx(s.hero)}>
        <SpinningBoxSection />
        {/* <MeshSurface /> */}
      </section>
      <section className={cx(s.info, "flex flex-col items-center")}>
        <p>
          We are Luck Luck, a design studio dedicated to crafting extraordinary experiences through innovation and
          creativity.
        </p>
      </section>
      <section className={cx(s.whatWeDo, "grid grid-cols-12 gap-20")}>
        <div className={cx(s.text, "col-span-5")}>
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
        <div className={cx(s.video, "col-span-7")}>
          <div className={s.videoC}>
            <Video src="/video/sample.mp4" />
          </div>
        </div>
      </section>
      <section className={cx(s.selectedWorks, "flex flex-col items-stretch")}>
        <SelectedWorksSection />
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
    <div className={s.test}>
      <div ref={el} className="Placeholder ScrollScene"></div>
      <UseCanvas>
        <ScrollScene track={el} hideOffscreen={false}>
          {(props) => <SpinningBoxWebGL {...props} />}
        </ScrollScene>
      </UseCanvas>
    </div>
  )
}

function SpinningBoxWebGL({
  scale,
  scrollState,
}: {
  scale: ScrollSceneChildProps["scale"]
  scrollState: ScrollSceneChildProps["scrollState"]
}) {
  const mesh = useRef<ThreeElements["mesh"]>(null)

  useFrame(() => {
    if (!mesh.current) return

    mesh.current.rotation.y = scrollState.progress * Math.PI * 2
  })

  return (
    <group scale={scale.xy.min() * 0.5}>
      <mesh ref={mesh}>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </group>
  )
}

function SelectedWorksSection() {
  const el = useRef<HTMLDivElement>(null)
  return (
    <div className={s.mest}>
      <div ref={el} className="Placeholder ViewportScrollScene"></div>
      <UseCanvas>
        <ScrollScene track={el} hideOffscreen={false}>
          {(props) => (
            <>
              {/* <PivotControls scale={1.5} depthTest={true} lineWidth={2.5} disableSliders>
                <SelectedWorksWebGL {...props} />
              </PivotControls>
              <Grid position={[0, 0.0, 0]} args={[30, 30]} scale={0.5} fadeDistance={14} />
              <Environment preset="dawn" />
              <color args={[0x088]} attach="background" />
              <PerspectiveCamera fov={14} position={[6, 8, 6]} makeDefault onUpdate={(self) => self.lookAt(0, 0, 0)} />
              <CameraControls makeDefault maxZoom={1} minZoom={1} /> */}

              <SelectedWorksWebGL {...props} />
            </>
          )}
        </ScrollScene>
      </UseCanvas>
    </div>
  )
}

function SelectedWorksWebGL({
  scale,
  scrollState,
}: {
  scale: ScrollSceneChildProps["scale"]
  scrollState: ScrollSceneChildProps["scrollState"]
}) {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (!mesh.current) return

    mesh.current.rotation.y = scrollState.progress * Math.PI * 2
  })

  const materialProps = useControls({
    thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.02, min: 0, max: 1 },
    backside: { value: true },
  })

  const { nodes } = useGLTF("/glb/torrus.glb") as any

  return (
    <>
      <PresentationControls rotation={[0, 0.1, 0]} snap={true}>
        <group scale={scale.xy.min() * 0.5}>
          <group scale={1} position={[0, 0, 1]}>
            <mesh ref={mesh} {...nodes.Torus002}>
              <MeshTransmissionMaterial {...materialProps} />
            </mesh>
          </group>

          <CanvasText />
        </group>
      </PresentationControls>

      <color attach="background" args={["#ffffff"]} />
    </>
  )
}

function CanvasText() {
  const { viewport } = useThree()
  const vw = viewport.width * 100

  return (
    <Text
      position={[0, 0, 0]}
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
  const { viewport } = useThree()
  const vw = viewport.width * 100

  useFrame((state, delta) => {
    if (vw <= 1024) return

    easing.damp3(
      state.camera.position,
      [Math.sin(-state.pointer.x), state.pointer.y, 8 + Math.cos(state.pointer.x)],
      0.2,
      delta
    )
    state.camera.lookAt(0, 0, 0)
  })
  return null
}
