import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <div>
      <nav style={{ padding: '15px', background: '#f0f0f0', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '15px', fontWeight: 'bold' }}>Dashboard</Link>
        <Link to="/login" style={{ marginRight: '15px', fontWeight: 'bold' }}>Login</Link>
        <Link to="/register" style={{ fontWeight: 'bold' }}>Register</Link>
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