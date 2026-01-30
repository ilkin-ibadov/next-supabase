"use client"
import { useState } from "react"

const AddTodo = () => {
    const [todoData, setTodoData] = useState({})

    const handleInput = (e) => {
        setTodoData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const createTodo = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/todos", {
                method: "POST",
                body: JSON.stringify(todoData),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (res.ok) {
                alert("Todo created successfully")
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className="flex flex-col gap-5 border border-zinc-300 p-12">
                <input className="border border-zinc-300" onChange={handleInput} name="title" type="text" />
                <textarea className="border border-zinc-300" onChange={handleInput} name="description" id=""></textarea>
                <button onClick={createTodo}>Create Todo</button>
            </div>
        </div>
    )
}

export default AddTodo