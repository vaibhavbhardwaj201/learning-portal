import { Outlet } from "react-router-dom"
import { StudentFooter, StudentHeader } from "../components"

const StudentLayout = () => {
  return (
    <div>
        <StudentHeader />
        <Outlet />
        <StudentFooter />
    </div>
  )
}

export default StudentLayout