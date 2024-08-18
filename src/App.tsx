import { Leva } from "leva"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import LetsTalk from "./pages/lets-talk"
import Works from "./pages/works"
import DetailWork from "./pages/detail-work"

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/works" element={<Works />}></Route>
        <Route path="/works/:projectName" element={<DetailWork />} />
        <Route path="/lets-talk" element={<LetsTalk />} />
      </Routes>
      <div className="relative z-[9999999999999999]">
        <Leva />
      </div>
    </>
  )
}

export default App
