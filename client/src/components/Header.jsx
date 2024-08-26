import { Link } from 'react-router-dom';
// import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase.config'; // Assuming you have a firebase.js file where you initialize Firebase

const Header = () => {
//   const [user] = useAuthState(auth);
    const user = null;

  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white hover:text-blue-300">
          Learning Port
        </Link>

        <nav className="flex space-x-4">
          <Link to="/about" className="text-white hover:text-blue-300">
            About
          </Link>
          <Link to="/courses" className="text-white hover:text-blue-300">
            Courses
          </Link>
          <Link to="/contact" className="text-white hover:text-blue-300">
            Contact
          </Link>
        </nav>

        <div className="flex space-x-4">
          {!user ? (
            <>
              <Link to="/login" className="bg-white text-blue-600 py-2 px-4 rounded hover:bg-blue-100">
                Login
              </Link>
              <Link to="/register" className="bg-white text-blue-600 py-2 px-4 rounded hover:bg-blue-100">
                Register
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="bg-white text-blue-600 py-2 px-4 rounded hover:bg-blue-100">
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
