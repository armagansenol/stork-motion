import { forwardRef, useLayoutEffect, useRef } from "react"
import s from "./page-transition.module.scss"

import { useLenis } from "@studio-freight/react-lenis"
import cn from "clsx"
import gsap from "gsap"
import { useLocation, useOutlet } from "react-router-dom"
import { CSSTransition, SwitchTransition } from "react-transition-group"

import Img from "@/components/custom-img"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { routes } from "@/global/routes"

import logo from "@/assets/gif/logo-loading-c.gif"

const TransitionPanel = forwardRef<HTMLDivElement>((_, ref) => (
  <div className={cn(s.pageTransition, "flex-center", "hidden-overflow")} ref={ref}>
    <div className={s.imgC}>
      <Img src={logo} objectFit="contain" />
    </div>
  </div>
))

const PageTransitionWrapper = () => {
  const location = useLocation()
  const { nodeRef } = routes.find((route) => location.pathname.includes(route.path)) ?? {}
  const ptRef = useRef<HTMLDivElement>(null)
  const currentOutlet = useOutlet()
  const lenis = useLenis()

  useLayoutEffect(() => {
    gsap.set(ptRef.current, {
      yPercent: -100,
    })
  }, [])

  const onEnter = () => {
    lenis.scrollTo("top", {
      immediate: true,
      lock: true,
    })

    gsap.to(ptRef.current, {
      delay: 0.4,
      duration: 0.6,
      ease: "expo.out",
      yPercent: -100,
      onComplete: () => {
        gsap.to(ptRef.current, {
          display: "none",
        })
      },
    })
  }

  const onExit = () => {
    gsap.to(ptRef.current, {
      ease: "expo.out",
      duration: 0.7,
      yPercent: 0,
      onStart: () => {
        gsap.to(ptRef.current, {
          display: "flex",
        })
      },
    })
  }

  return (
    <>
      <div className="hidden-overflow">
        <Header />
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef as React.RefObject<HTMLElement>}
            timeout={1000}
            unmountOnExit
            onEnter={onEnter}
            onExit={onExit}
          >
            <main ref={nodeRef as React.RefObject<HTMLDivElement>}>{currentOutlet}</main>
          </CSSTransition>
        </SwitchTransition>
        <Footer />
      </div>
      <TransitionPanel ref={ptRef} />
    </>
  )
}

export default PageTransitionWrapper
