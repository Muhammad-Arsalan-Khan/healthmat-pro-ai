import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

const AuthRoute = () => {
  const token = Cookies.get("token")

  return !token ? <Outlet /> : <Navigate to="/" />
}

export default AuthRoute
