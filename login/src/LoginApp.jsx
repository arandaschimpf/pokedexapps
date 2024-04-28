import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router"


export const LoginApp = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
