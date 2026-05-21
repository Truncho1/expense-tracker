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
        <p>No expenses found. Add some above!</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {expenses.map((expense) => (
            <li 
              key={expense.id} 
              style={{ background: '#fff', margin: '10px 0', padding: '15px', border: '1px solid #ddd' }}
            >
              <strong>{expense.title}</strong>: ${expense.amount}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}