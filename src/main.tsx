import "@/assets/css/tailwind-initial.css"
import "@/assets/scss/global.scss"
import React from "react"
import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter } from "react-router-dom"
import App from "./App.tsx"
import R3fScrollRigWrapper from "./hocs/r3f-scroll-rig-wrapper/index.tsx"
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <R3fScrollRigWrapper>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </R3fScrollRigWrapper>
  </React.StrictMode>
)
