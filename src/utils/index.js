export function getTodos() {
  let todos = window.localStorage.getItem("todos")

  if (todos) todos = JSON.parse(todos)
  else todos = []

  return todos
}
