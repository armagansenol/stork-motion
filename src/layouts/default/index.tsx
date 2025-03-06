import { Footer } from "@/components/footer"
import { useScrollbar } from "@14islands/r3f-scroll-rig"
import { ReactNode, useEffect } from "react"
import { useLocation } from "react-router-dom"

type Props = {
  children: ReactNode
}

const DefaultLayout = ({ children }: Props) => {
  const scrollbar = useScrollbar()
  const { pathname } = useLocation()

  useEffect(() => {
    scrollbar?.__lenis?.scrollTo(0, { immediate: true })
  }, [pathname])

  return (
    <>
      {children}
      <Footer />
    </>
  )
}

export default DefaultLayout
