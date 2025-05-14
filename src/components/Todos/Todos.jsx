import { DndContext } from "@dnd-kit/core"
import { restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers"
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useEffect, useState } from "react"
import "./Todos.css"

function Todos({ todos, filter, onCompleteChange, onDeleteTodo, onReorderTodos }) {
  const [ canHover, setCanHover ] = useState(initialCanHover)
  
  let todosList
  if (filter === "all") todosList = todos
  else if (filter === "active") todosList = todos.filter(todo => todo.isCompleted === false)
  else if (filter === "completed") todosList = todos.filter(todo => todo.isCompleted === true)

  function handleDragEnd(e) {
    const { active, over } = e

    if (active.id !== over?.id) {
        const oldIndex = todos.findIndex(todo => todo.id === active.id)
        const newIndex = todos.findIndex(todo => todo.id === over?.id)
        const newReorderedTodos = arrayMove(todos, oldIndex, newIndex)

        onReorderTodos(newReorderedTodos)
    }
  }

  useEffect(() => {
    const mql = window.matchMedia("(hover)")

    mql.addEventListener("change", (e) => {
      setCanHover(e.matches)
    })
  }, [setCanHover])

  return (
    <DndContext modifiers={[restrictToFirstScrollableAncestor]} onDragEnd={handleDragEnd}>
      <ol className="todos">
        <SortableContext items={todos.map(todo => todo.id)} strategy={verticalListSortingStrategy}>
          {todosList.map(todo => (
            <Todo key={todo.id} id={todo.id} description={todo.description} isCompleted={todo.isCompleted} canHover={canHover} onCompleteChange={onCompleteChange} onDeleteTodo={onDeleteTodo} />
          ))}
        </SortableContext>
      </ol>
    </DndContext>
  )
}

function Todo({ id, description, isCompleted, canHover, onCompleteChange, onDeleteTodo }) {
  const { setNodeRef, listeners, transform, transition, isDragging } = useSortable({ id })

  const style = transform ? {
    transform: `translateY(${transform.y}px)`,
    transition
  }: undefined

  const customListeners = {
    onPointerDown(e) {
      if (e.target.matches(".checkbox") || e.target.matches(".delete-todo img")) return
      else listeners.onPointerDown(e)
    }
  }

  function handleDeleteClick() {
    onDeleteTodo(id)
  }

  function handleCompleteChange(e) {
    onCompleteChange(id, e.target.checked)
  }

  return (
    <li key={id} className={`todo ${isDragging ? "dragging" : ""}`} ref={setNodeRef} style={style} {...(canHover ? customListeners : {})}>
      <button className="drag-todo"><img src="/images/icon-drag.svg" alt="Drag" {...listeners} /></button>
      <input name="checked" className="checkbox" type="checkbox" checked={isCompleted} onChange={handleCompleteChange} />
      <span className="description">{description}</span>
      <button className="delete-todo"><img src="/images/icon-cross.svg" alt="Delete" onClick={(handleDeleteClick)} /></button>
    </li>
  )
}

const initialCanHover = window.matchMedia("(hover)").matches

export default Todos