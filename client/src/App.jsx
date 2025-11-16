import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import DashboardLayout from './components/layout/DashboardLayout'
import Profile from './pages/Profile'



const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<ProtectedRoute />}>

            <Route element={<DashboardLayout />}>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/profile' element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App