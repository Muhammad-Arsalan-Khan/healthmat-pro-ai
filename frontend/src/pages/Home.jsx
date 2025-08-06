import { Routes, Route } from 'react-router-dom'
import AdminRoute from '../routes/AdminRoutes'
import AuthRoutes from '../routes/authRoutes'
import PrivateRoutes from '../routes/privateRoutes'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import LandingPage from './LandingPage'
import Dashboard from './user/Dashboard'
import AdminDashboard from './admin/Dashboard'
import NotFound from "./NotFound"

function Home() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />

        <Route index element={<LandingPage />} />
  
         <Route element={<PrivateRoutes />}>
          <Route path="/dashboard/:id" element={<Dashboard />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard/:id" element={<AdminDashboard/>} />
        </Route>

        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>{/* </Route> */}
      </Routes>
    </>
  )
}

export default Home