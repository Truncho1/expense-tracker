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

  
  const linkStyle = { color: 'white', textDecoration: 'none', fontWeight: '500', fontSize: '1.1rem' }

  return (
    <nav style={{ 
      padding: '15px 30px', 
      background: '#2c3e50', 
      color: 'white',
      display: 'flex', 
      alignItems: 'center',
      gap: '20px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.4rem', marginRight: 'auto', letterSpacing: '1px' }}>
        💰 ExpenseTracker
      </div>
      
      {user ? (
        <>
          <Link to="/" style={linkStyle}>Dashboard</Link>
          <button 
            onClick={handleLogout} 
            style={{ 
              background: '#e74c3c', 
              color: 'white', 
              border: 'none', 
              padding: '8px 15px', 
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>
            Logout ({user.email})
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={linkStyle}>Login</Link>
          <Link to="/register" style={linkStyle}>Register</Link>
        </>
      )}
    </nav>
  )
}