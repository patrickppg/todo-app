import { useState } from 'react'
import { getTodos } from "./utils"
import { nanoid } from 'nanoid'
import Header from './components/Header/Header.jsx'
import AddTodo from './components/AddTodo/AddTodo.jsx'
import Todos from './components/Todos/Todos.jsx'
import Bar from './components/Bar/Bar.jsx'
import './App.css'

function App() {
  const [todos, setTodos] = useState(initialTodos)
  const [filter, setFilter] = useState("all")

  function onClearCompleted() {
    const updatedTodos = todos.filter(todo => todo.isCompleted === false)
    window.localStorage.setItem("todos", JSON.stringify(updatedTodos))
    setTodos(updatedTodos)
  }
  
  function onCreateTodo(newTodo) {
    const updatedTodos = [newTodo, ...todos]
    window.localStorage.setItem("todos", JSON.stringify(updatedTodos))
    setTodos(updatedTodos)
  }

  function onDeleteTodo(id) {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    window.localStorage.setItem("todos", JSON.stringify(updatedTodos))
    setTodos(updatedTodos)
  }

  function onCompleteChange(id, isCompleted) {
    const updatedTodos = todos.map(todo => todo.id === id ? { ...todo, isCompleted: isCompleted } : todo)
    window.localStorage.setItem("todos", JSON.stringify(updatedTodos))
    setTodos(updatedTodos)
  }

  function onFilterChange(filter) {
    setFilter(filter)
  }

  function onReorderTodos(orderedTodos) {
    window.localStorage.setItem("todos", JSON.stringify(orderedTodos))
    setTodos(orderedTodos)
  }

  let numberOfActiveTodos = 0
  todos.forEach(todo => {
    if (!todo.isCompleted) numberOfActiveTodos += 1
  })

  return (
    <div className="app">
      <Header />
      <AddTodo onCreateTodo={onCreateTodo} />
      <div className="todos-menubar-container">
        <Todos todos={todos} filter={filter} onCompleteChange={onCompleteChange} onDeleteTodo={onDeleteTodo} onReorderTodos={onReorderTodos} />
        <Bar numberOfActiveTodos={numberOfActiveTodos} onFilterChange={onFilterChange} onClearCompleted={onClearCompleted} />
      </div>
      <p className="drag">Drag and drop to reorder list</p>
    </div>
  )
}

let initialTodos = getTodos()
if (!window.localStorage.getItem("todos")) {
  initialTodos = [
    { id: nanoid(), description: "Complete online JavaScript course", isCompleted: true },
    { id: nanoid(), description: "Jog around the park 3x", isCompleted: false },
    { id: nanoid(), description: "10 minutes meditation", isCompleted: false },
    { id: nanoid(), description: "Read for 1 hour", isCompleted: false },
    { id: nanoid(), description: "Pick up groceries", isCompleted: false },
    { id: nanoid(), description: "Complete Todo App on Frontend Mentor", isCompleted: false },
  ]
  
  window.localStorage.setItem("todos", JSON.stringify(initialTodos))
}

export default App
