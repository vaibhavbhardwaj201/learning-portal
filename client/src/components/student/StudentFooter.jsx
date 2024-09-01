import { Link } from 'react-router-dom';

const StudentFooter = () => {
  return (
    <footer className="bg-blue-600 text-white p-6 mt-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p className="text-sm">
            We aim to provide quality education to students by connecting them with the best teachers worldwide.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <nav className="flex flex-col space-y-2">
            <Link to="/student/home" className="hover:text-gray-300">Home</Link>
            <Link to="/student/courses" className="hover:text-gray-300">Courses</Link>
            <Link to="/student/grades" className="hover:text-gray-300">Grades</Link>
            <Link to="/student/profile" className="hover:text-gray-300">Profile</Link>
            <Link to="/contact" className="hover:text-gray-300">Contact Us</Link>
          </nav>
        </div>

        {/* Social Media & Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77 0-1.4.62-1.4 1.39 0 .78.63 1.41 1.4 1.41.77 0 1.39-.63 1.39-1.41 0-.77-.62-1.39-1.39-1.39zm-.5 1.79c.14-.02.26.1.26.25 0 .14-.12.26-.26.26-.15 0-.27-.12-.27-.26 0-.15.12-.27.27-.25zM18.69 7.4h-2.56c-.37 0-.67.3-.67.67v1.68h3.23l-.42 3.17h-2.81v8.08H14.5v-8.08h-2.34v-3.17h2.34V8.47c0-2.32 1.39-3.57 3.41-3.57.97 0 1.81.07 2.05.1v2.37h-.97z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2.04c-5.51 0-9.96 4.45-9.96 9.96 0 4.41 3.58 8.05 8.17 8.8v-6.22h-2.46v-2.58h2.46v-1.96c0-2.43 1.48-3.75 3.64-3.75 1.04 0 1.94.08 2.2.11v2.55h-1.51c-1.19 0-1.42.57-1.42 1.4v1.83h2.83l-.37 2.58h-2.46v6.22c4.59-.75 8.17-4.39 8.17-8.8 0-5.51-4.45-9.96-9.96-9.96z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M21.94 10.7c.01.14.01.28.01.42 0 4.26-3.24 9.18-9.18 9.18-1.82 0-3.52-.53-4.95-1.44.26.03.52.04.78.04 1.51 0 2.91-.51 4.02-1.36-1.41-.02-2.6-.96-3.01-2.24.2.03.4.05.62.05.29 0 .58-.04.85-.11-1.48-.3-2.6-1.6-2.6-3.17v-.04c.44.25.95.4 1.49.42-1.39-.93-1.83-2.79-1-4.3 1.61 1.98 4.02 3.28 6.73 3.42-.45-1.82.72-3.58 2.53-3.58.75 0 1.43.32 1.91.83.59-.11 1.15-.33 1.65-.63-.19.6-.6 1.1-1.12 1.42.52-.06 1.02-.2 1.48-.41-.34.52-.78.97-1.28 1.33z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} StudentPortal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default StudentFooter;
