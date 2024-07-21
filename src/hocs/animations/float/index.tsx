import { ReactNode, useLayoutEffect, useRef } from "react"

import gsap from "gsap"

type Props = {
  children: ReactNode
  amountY: number
  amountRotate: number
}

const Float = ({ children, amountY = 10, amountRotate = 3 }: Props) => {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: amountY,
        rotate: amountRotate,
        duration: 4,
        repeat: -1,
        yoyo: true,
        yoyoEase: "none",
      })
    }, ref)

    return () => {
      ctx.revert()
    }
  }, [amountRotate, amountY])

  return (
    <div ref={ref} style={{ width: "inherit", height: "inherit", willChange: "transform" }}>
      {children}
    </div>
  )
}

export default Float
