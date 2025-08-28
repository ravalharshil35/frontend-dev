import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }:any) => {
  const isAuthenticated = localStorage.getItem('user'); 

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;