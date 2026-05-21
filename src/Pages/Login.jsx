import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

export default function Login() 
{
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = async (e) => 
  {
    e.preventDefault()
    try 
    {
      const response = await axios.post('http://localhost:8000/login', { email, password })
      login(response.data.user, response.data.accessToken)
      navigate('/')
    } 
    catch (error) 
    {
      alert('Invalid credentials')
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div style={{ 
        background: 'white', 
        padding: '40px', 
        borderRadius: '10px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)', 
        width: '100%', 
        maxWidth: '350px' 
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#2c3e50' }}>Welcome Back</h2>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '1rem' }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '1rem' }}
          />
          <button 
            type="submit" 
            style={{ 
              padding: '12px', 
              background: '#3498db', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px', 
              fontSize: '1.1rem', 
              cursor: 'pointer',
              fontWeight: 'bold',
              marginTop: '10px'
            }}>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}