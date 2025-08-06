import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

const AdminRoute = () => {
  const token = Cookies.get('token')
  const isVerified = Cookies.get('isVerified')

  return !token ? <Navigate to="/" /> : !isVerified  ? <Navigate to="/dashboard" /> : <Outlet />
};

export default AdminRoute
