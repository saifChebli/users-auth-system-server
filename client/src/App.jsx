import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route 
            path='/dashboard' 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App