import { Outlet } from "react-router-dom"
import { TeacherFooter, TeacherHeader } from "../components"

const TeacherLayout = () => {
  return (
    <div>
        <TeacherHeader />
        <Outlet />
        <TeacherFooter /> 
    </div>
  )
}

export default TeacherLayout