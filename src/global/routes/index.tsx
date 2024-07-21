import Home from "@/pages/home"
import { createRef } from "react"

export const routes = [
  { path: "/", name: "Home", element: <Home />, nodeRef: createRef() },
  // { path: "/about", name: "About", element: <About />, nodeRef: createRef() },
  // {
  //   path: "/all-products",
  //   name: "All Products",
  //   element: <AllProducts />,
  //   nodeRef: createRef(),
  // },
  // { path: "/all-products/:detail", name: "Detail", element: <DetailProduct />, nodeRef: createRef() },
  // { path: "*", name: "Page Not Fund", element: <NotFound />, nodeRef: createRef() },
]
