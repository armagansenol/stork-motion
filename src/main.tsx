import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "@/assets/scss/global.scss"
import "@/assets/css/tailwind-initial.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { routes } from "./global/routes/index.tsx"
import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routes.map((route) => ({
      index: route.path === "/" ? true : false,
      path: route.path === "/" ? undefined : route.path,
      element: route.element,
    })),
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalCanvas style={{ pointerEvents: "none" }}>
      <ambientLight />
    </GlobalCanvas>
    <SmoothScrollbar>
      {(bind) => (
        <div {...bind}>
          <RouterProvider router={router} />
        </div>
      )}
    </SmoothScrollbar>
  </React.StrictMode>
)
