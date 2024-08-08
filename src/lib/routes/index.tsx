import DetailWork from "@/pages/detail-work"
import Home from "@/pages/home"
import LetsTalk from "@/pages/lets-talk"
import NotFound from "@/pages/not-found"
import Works from "@/pages/works"
import { createRef } from "react"

export const routes = [
  { path: "/", name: "Home", element: <Home />, nodeRef: createRef() },
  {
    path: "/works",
    name: "Works",
    element: <Works />,
    nodeRef: createRef(),
  },
  {
    path: "/lets-talk",
    name: "Let's Talk",
    element: <LetsTalk />,
    nodeRef: createRef(),
  },
  { path: "/works/:projectName", name: "Detail", element: <DetailWork />, nodeRef: createRef() },
  { path: "*", name: "Page Not Fund", element: <NotFound />, nodeRef: createRef() },
]
