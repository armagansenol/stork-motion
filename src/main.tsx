import "@/assets/css/tailwind-initial.css"
import "@/assets/scss/global.scss"
import React from "react"
import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "react-query"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App.tsx"
import { routes } from "./lib/routes/index.tsx"
import R3fScrollRigWrapper from "./hocs/r3f-scroll-rig-wrapper/index.tsx"
const queryClient = new QueryClient()

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
    <R3fScrollRigWrapper>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </R3fScrollRigWrapper>
  </React.StrictMode>
)
