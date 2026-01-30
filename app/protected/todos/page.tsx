"use client"
import { useState, useEffect } from "react"

const Todos = () => {
  const [todos, setTodos] = useState([])
  const [change, setChange] = useState(false)

  const fetchTodos = async () => {
    try {
      const res = await fetch("/api/todos", {
        headers: {
          "Content-Type": "application/json"
        }
      })

      const todos = await res.json()

      setTodos(todos)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        }
      })

      alert(res.ok ? "Todo successfully deleted" : "Error while deleting todo")

      setChange(prevValue => !prevValue)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [change])

  return (
    <div className="w-full h-screen grid grid-cols-4 gap-5 p-5">
      {todos.length ? todos.map(todo => <div key={todo.id} className="border border-zinc-300 p-5 h-fit">
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
        <button onClick={() => {
          deleteTodo(todo.id)
        }}>Delete</button>
      </div>) : <p>No todos yet</p>}
    </div>
  )
}

export default Todos