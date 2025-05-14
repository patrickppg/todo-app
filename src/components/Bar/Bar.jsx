import "./Bar.css"

function Bar({ numberOfActiveTodos, onFilterChange, onClearCompleted }) {

  function handleClearCompletedClick() {
    onClearCompleted()
  }

  function handleFilterChange(e) {
    onFilterChange(e.target.value)
  }

  return (
    <div className="menubar">
      <span className="status">{numberOfActiveTodos} items left</span>
      <fieldset className="filters" onChange={handleFilterChange}>
        <label className="filter">
          All
          <input name="filter" value="all" type="radio" defaultChecked />
        </label>
        <label className="filter">
          Active
          <input name="filter" value="active" type="radio" />
        </label>
        <label className="filter">
          Completed
          <input name="filter" value="completed" type="radio" />
        </label>
      </fieldset>
      <div>
        <button className="clear-todos" onClick={handleClearCompletedClick}>Clear Completed</button>
      </div>
    </div>
  )
}

export default Bar