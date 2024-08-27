import { Suspense } from 'react'
import { Routes, Route} from 'react-router-dom'
import { QueryClient, QueryClientProvider} from 'react-query'
import { HomeLayout, StudentLayout, TeacherLayout } from '../layouts'
import { Home, Login, Register, StudentHome, TeacherHome } from '../pages'
import TeacherCourses from '../pages/teacher/TeacherCourses'

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
          </Route>

          {/* Teacher layout */}
          <Route path='/teacher' element={<TeacherLayout />}>
            <Route index element={<TeacherHome />} />
            <Route path='courses' element={<TeacherCourses />} />
          </Route>
        </Routes>

      </Suspense>
    </QueryClientProvider>
  )
}

export default App
