import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.config'; // Adjust the path as needed

const TeacherHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo or Dashboard Title */}
        <div className="text-2xl font-bold">
          Teacher Dashboard
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-4">
          <Link to="/teacher" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/teacher/courses" className="hover:text-gray-300">
            Courses
          </Link>
          <Link to="/teacher/students" className="hover:text-gray-300">
            Students
          </Link>
          <Link to="/teacher/profile" className="hover:text-gray-300">
            Profile
          </Link>
          <Link to="/teacher/add-course" className="hover:text-gray-300 font-semibold text-yellow-200">
            Add Course
          </Link>
        </nav>


        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default TeacherHeader;
