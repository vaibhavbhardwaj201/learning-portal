import { Outlet } from "react-router-dom"
import { Header, Footer } from "../components"

const HomeLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default HomeLayout