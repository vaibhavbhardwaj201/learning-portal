import { Link } from 'react-router-dom';

const TeacherFooter = () => {
  return (
    <footer className="bg-blue-600 text-white py-4 mt-8">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Left Section: Footer Links */}
        <div className="flex space-x-4">
          <Link to="/terms" className="hover:text-gray-300">
            Terms of Service
          </Link>
          <Link to="/privacy" className="hover:text-gray-300">
            Privacy Policy
          </Link>
          <Link to="/support" className="hover:text-gray-300">
            Support
          </Link>
          <Link to="/contact" className="hover:text-gray-300">
            Contact Us
          </Link>
        </div>

        {/* Right Section: Copyrigh */}
        <div className="text-sm">
          &copy; {new Date().getFullYear()} Teacher Dashboard. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default TeacherFooter;
