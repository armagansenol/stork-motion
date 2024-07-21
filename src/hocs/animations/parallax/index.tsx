import { ReactNode, useLayoutEffect, useRef } from "react"

import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

type Props = {
  children: ReactNode
  directionX?: 1 | -1
  directionY?: 1 | -1
  speedX?: number
  speedY?: number
}

const Parallax = ({ children, speedX = 1, speedY = 1, directionX = 1, directionY = 1 }: Props) => {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        xPercent: () => 100 * speedX * directionX,
        yPercent: () => 100 * speedY * directionY,
        scrollTrigger: {
          id: "parallax",
          // markers: true,
          scrub: true,
          trigger: ref.current,
        },
      })
    }, ref)

    return () => {
      ctx.revert()
    }
  }, [directionX, directionY, speedX, speedY])

  return (
    <div ref={ref} style={{ width: "inherit", height: "inherit" }}>
      {children}
    </div>
  )
}

export default Parallax
