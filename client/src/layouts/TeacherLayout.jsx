import { Outlet } from "react-router-dom"

const TeacherLayout = () => {
  return (
    <div>
        <p>Teacher Header</p>
        <Outlet />
        <p>Teacher Footer</p>
    </div>
  )
}

export default TeacherLayout