import Header from "@/components/header"
import { useOutlet } from "react-router-dom"

function App() {
  const currentOutlet = useOutlet()

  return (
    <>
      <Header />
      {currentOutlet}
    </>
  )
}

export default App
