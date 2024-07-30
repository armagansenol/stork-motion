import { Footer } from "@/components/footer"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

const DefaultLayout = ({ children }: Props) => {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default DefaultLayout
