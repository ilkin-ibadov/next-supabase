"use client"
import { useState, useEffect } from "react"

const Todos = () => {
  const [todos, setTodos] = useState([])

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

      if (res.ok) {
        const data = await res.json()
        console.log(data.message)
        // alert(data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div className="w-full h-screen grid grid-cols-4 gap-5 p-5">
      {todos.map(todo => <div className="border border-zinc-300 p-5 h-fit">
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
        <button onClick={() => {
          deleteTodo(todo.id)
        }}>Delete</button>
      </div>)}
    </div>
  )
}

export default Todos