import { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

export default function ExpenseForm({ onExpenseAdded }) 
{
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const { user } = useContext(AuthContext)

  const handleSubmit = async (e) => 
  {
    e.preventDefault()

    try 
    {
      const response = await axios.post('http://localhost:8000/expenses', {
        title: title,
        amount: parseFloat(amount),
        userId: user.id
      })

      onExpenseAdded(response.data)
      setTitle('')
      setAmount('')
    } 
    catch (error) 
    {
      console.error('Error adding expense:', error)
      alert('Could not add expense')
    }
  }

  return (
    <div style={{ background: '#f9f9f9', padding: '15px', marginBottom: '20px', border: '1px solid #ccc' }}>
      <h3>Add New Expense</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="What did you buy?" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: '8px', flex: 1 }}
        />
        <input 
          type="number" 
          placeholder="Amount ($)" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={{ padding: '8px', width: '100px' }}
        />
        <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer' }}>Add</button>
      </form>
    </div>
  )
}