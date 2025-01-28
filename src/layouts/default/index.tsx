import { Footer } from "@/components/footer"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

const DefaultLayout = ({ children }: Props) => {
  // const scrollbar = useScrollbar()

  // useEffect(() => {
  //   scrollbar.__lenis?.scrollTo(0, { immediate: true })
  // }, [scrollbar])

  return (
    <>
      {children}
      <Footer />
    </>
  )
}

export default DefaultLayout
