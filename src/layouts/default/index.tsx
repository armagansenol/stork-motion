import { Footer } from "@/components/footer"
import { useScrollbar } from "@14islands/r3f-scroll-rig"
import { ReactNode, useEffect } from "react"

type Props = {
  children: ReactNode
}

const DefaultLayout = ({ children }: Props) => {
  const scrollbar = useScrollbar()

  useEffect(() => {
    scrollbar.scrollTo(0)
  }, [])

  return (
    <>
      {children}
      <Footer />
    </>
  )
}

export default DefaultLayout
