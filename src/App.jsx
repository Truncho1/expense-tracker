import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar' // Вмъкваме новото меню
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

function App() 
{
  return (
    <div>
      <Navbar /> 

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