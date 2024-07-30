import Header from "@/components/header"
import { Leva } from "leva"
import { useOutlet } from "react-router-dom"

function App() {
  const currentOutlet = useOutlet()

  return (
    <>
      <Header />
      {currentOutlet}
      <Leva />
    </>
  )
}

export default App
