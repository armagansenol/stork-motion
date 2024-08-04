import Header from "@/components/header"
import { Leva } from "leva"
import { useOutlet } from "react-router-dom"

function App() {
  const currentOutlet = useOutlet()

  return (
    <>
      <Header />
      {currentOutlet}
      <div className="relative z-[9999999999999999]">
        <Leva />
      </div>
    </>
  )
}

export default App
