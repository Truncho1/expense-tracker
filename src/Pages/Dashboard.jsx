import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import ExpenseForm from '../components/ExpenseForm'

export default function Dashboard() 
{
  const [expenses, setExpenses] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(() => 
  {
    if (!user) return

    const fetchExpenses = async () => 
    {
      try 
      {
        const response = await axios.get(`http://localhost:8000/expenses?userId=${user.id}`)
        setExpenses(response.data)
      } 
      catch (error) 
      {
        console.error('Error fetching expenses:', error)
      }
    }

    fetchExpenses()
  }, [user])

  const handleExpenseAdded = (newExpense) => 
  {
    setExpenses([...expenses, newExpense])
  }

  const handleDelete = async (id) => 
  {
    try 
    {
      await axios.delete(`http://localhost:8000/expenses/${id}`)
      
      setExpenses(expenses.filter(expense => expense.id !== id))
    } 
    catch (error) 
    {
      console.error('Error deleting expense:', error)
      alert('Could not delete expense')
    }
  }

  if (!user) 
  {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Please Login or Register to view your expenses.</h2>
      </div>
    )
  }

  return (
    <div>
      <h2>My Expenses Dashboard</h2>
      
      <ExpenseForm onExpenseAdded={handleExpenseAdded} />
      
      {expenses.length === 0 ? (
        <p style={{ fontStyle: 'italic', color: '#666' }}>No expenses found. Add some above!</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {expenses.map((expense) => (
            <li 
              key={expense.id} 
              style={{ 
                background: '#fff', 
                margin: '10px 0', 
                padding: '15px', 
                border: '1px solid #ddd',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'space-between', 
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>
                <strong>{expense.title}</strong>: ${expense.amount.toFixed(2)}
              </span>
              
              <button 
                onClick={() => handleDelete(expense.id)}
                style={{ 
                  background: '#ff4d4d', 
                  color: 'white', 
                  border: 'none', 
                  padding: '8px 12px', 
                  cursor: 'pointer', 
                  borderRadius: '4px',
                  fontWeight: 'bold'
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}