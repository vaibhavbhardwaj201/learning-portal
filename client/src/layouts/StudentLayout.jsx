import { Outlet } from "react-router-dom"

const StudentLayout = () => {
  return (
    <div>
        <p>Student Header</p>
        <Outlet />
        <p>Student Footer</p>
    </div>
  )
}

export default StudentLayout