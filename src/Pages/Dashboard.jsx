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

  // ТУК ПРЕСМЯТАМЕ ОБЩАТА СУМА:
  const totalSpent = expenses.reduce((sum, currentExpense) => sum + currentExpense.amount, 0)

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      {/* КАРЕ ЗА ОБЩАТА СУМА И ЗАГЛАВИЕ */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#2c3e50' }}>My Expenses</h2>
        <div style={{ 
          background: '#2ecc71', 
          color: 'white', 
          padding: '10px 20px', 
          borderRadius: '8px', 
          fontSize: '1.2rem',
          fontWeight: 'bold',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          Total Spent: ${totalSpent.toFixed(2)}
        </div>
      </div>
      
      <ExpenseForm onExpenseAdded={handleExpenseAdded} />
      
      {expenses.length === 0 ? (
        <p style={{ fontStyle: 'italic', color: '#666', textAlign: 'center', marginTop: '30px' }}>
          No expenses found. Add your first one above!
        </p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {expenses.map((expense) => (
            <li 
              key={expense.id} 
              style={{ 
                background: '#fff', 
                margin: '10px 0', 
                padding: '15px 20px', 
                borderLeft: '5px solid #3498db', // Красива синя линия отляво
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
              }}
            >
              <span style={{ fontSize: '1.1rem', color: '#333' }}>
                <strong>{expense.title}</strong>
              </span>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#e74c3c' }}>
                  ${expense.amount.toFixed(2)}
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
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}