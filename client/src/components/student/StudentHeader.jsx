import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.config';

const StudentHeader = () => {
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
    <header className="bg-blue-600 text-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="text-2xl font-bold">
          <Link to="/student/home">StudentPortal</Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <Link to="/student/courses" className="hover:text-gray-300">
            All Courses
          </Link>
          <Link to="/student/grades" className="hover:text-gray-300">
            Grades
          </Link>
          <Link to="/student/profile" className="hover:text-gray-300">
            Profile
          </Link>
          <Link to="/student/my-courses" className="hover:text-gray-300">
            My Courses
          </Link>
          <Link to="/student/notifications" className="hover:text-gray-300">
            Notifications
          </Link>
        </nav>

        {/* Logout Button */}
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
          Logout
        </button>
      </div>
    </header>
  );
};

export default StudentHeader;
