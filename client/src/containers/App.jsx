import { Suspense } from 'react'
import { Routes, Route} from 'react-router-dom'
import { QueryClient, QueryClientProvider} from 'react-query'
import { HomeLayout, StudentLayout, TeacherLayout } from '../layouts'
import { AddCourse, Home, Login, Register, StudentCourses, StudentHome, TeacherHome, TeacherProfile, TeacherStudents } from '../pages'
import TeacherCourses from '../pages/teacher/TeacherCourses'
import { CourseDetail } from '../components'

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          {/* Home layout of site */}
          <Route element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/about' element={<div>About</div>} />
            <Route path='/courses' element={<div>Courses</div>} />
            <Route path='/contact' element={<div>Contact</div>} />
          </Route>

          {/* Student layout */}
          <Route path='/student' element={<StudentLayout />}>
            <Route index element={<StudentHome />} />
            <Route path='courses' element={<StudentCourses />} />
          </Route>

          {/* Teacher layout */}
          <Route path='/teacher' element={<TeacherLayout />}>
            <Route index element={<TeacherHome />} />
            <Route path='courses' element={<TeacherCourses />} />
            <Route path='students' element={<TeacherStudents />} />
            <Route path='profile' element={<TeacherProfile />} />
            <Route path='add-course' element={<AddCourse />} />
            <Route path='courses/:courseId' element={<CourseDetail />} />
          </Route>
        </Routes>

      </Suspense>
    </QueryClientProvider>
  )
}

export default App
