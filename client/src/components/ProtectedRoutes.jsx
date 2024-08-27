import { Navigate, Outlet } from 'react-router-dom';
import propTypes from 'prop-types';

// import useAuth from '../hooks/useAuth';

const  ProtectedRoute = ({ children, allowedRoles, currentUser}) => {
  // const { currentUser } = useAuth();
  console.log('Current User:', currentUser);
  if (currentUser === undefined) {
    return <div>Loading...</div>
  }
  if (allowedRoles.includes(currentUser.role)) {
    // If the user's role is not allowed, redirect to a "not authorized" page or home
    return <Navigate to={`/${currentUser.role}`} />;
  }

  if (!currentUser) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If the user is authenticated and has the right role, render the child components
  return children ? children : <Outlet />;
}

ProtectedRoute.propTypes = {
children: propTypes.node.isRequired,
allowedRoles: propTypes.arrayOf(propTypes.string).isRequired,
currentUser: propTypes.object,
};

export default ProtectedRoute;
