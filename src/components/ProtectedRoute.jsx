import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const authToken = localStorage.getItem('authToken');

  if (!authToken) {
    return <Navigate to="/login" replace={true} />;
  }
  return <Outlet />;
};
export default ProtectedRoute;