import s from "./home.module.scss"

import cx from "clsx"

import DefaultLayout from "@/layouts/default"
import { ScrollScene, ScrollSceneChildProps, UseCanvas } from "@14islands/r3f-scroll-rig"
import { ThreeElements, useFrame } from "@react-three/fiber"
import { useRef } from "react"

export interface HomeProps {}

export default function Home(props: HomeProps) {
  console.log(props)

  return (
    <DefaultLayout>
      <section className={cx(s.hero)}>
        <SpinningBoxSection />
      </section>
      <section className={cx(s.info, "flex flex-col items-center")}>
        <p>
          We are Luck Luck, a design studio dedicated to crafting extraordinary experiences through innovation and
          creativity.
        </p>
      </section>
      <section>
        <h2>WHAT WE DO</h2>
        <ul>
          <li>
            <p>Brand Identity</p>
          </li>
        </ul>
      </section>
      <section className={s.selectedWorksTitle}>
        <h2>SELECTED WORKS</h2>
        <p>Dive into our extensive portfolio of completed projects to see the magic of 3D motion design in action.</p>
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
        <ScrollScene track={el}>{(props) => <SpinningBoxWebGL {...props} />}</ScrollScene>
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
