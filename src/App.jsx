import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

function App() 
{
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => 
  {
    logout()
    navigate('/login')
  }

  return (
    <div>
      <nav style={{ padding: '15px', background: '#f0f0f0', marginBottom: '20px', display: 'flex', gap: '15px' }}>
        <div style={{ fontWeight: 'bold', marginRight: 'auto' }}>Expense Tracker</div>
        
        {user ? (
          <>
            <Link to="/">Dashboard</Link>
            <button onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout ({user.email})</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>

      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  )
}

export default App