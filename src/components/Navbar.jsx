import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() 
{
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => 
  {
    logout()
    navigate('/login')
  }

  return (
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
  )
}