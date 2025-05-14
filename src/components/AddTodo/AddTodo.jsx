import { nanoid } from "nanoid"
import "./AddTodo.css"

function AddTodo({ onCreateTodo }) {

  function handleSubmitTodo(e) {
    e.preventDefault()

    const newTodo = {
      id: nanoid(),
      description: e.target.elements["todo"].value,
      isCompleted: false,
    }

    e.target.reset()
    onCreateTodo(newTodo)
  }

  function handleInvalidTodo(e) {
    e.preventDefault()
  }

  return (
    <form className="create-todo-field" onSubmit={handleSubmitTodo}>
      <span className="checkbox"></span>
      <input className="new-todo" name="todo" type="text" placeholder="Create a new todo..." autoComplete="off" required pattern=".*\S.*" onInvalid={handleInvalidTodo} />
    </form>
  )
}

export default AddTodo