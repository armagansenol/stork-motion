import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

const DefaultLayout = ({ children }: Props) => {
  return <main>{children}</main>
}

export default DefaultLayout
