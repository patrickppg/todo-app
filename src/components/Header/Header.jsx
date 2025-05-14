import { useEffect, useState } from "react"
import "./Header.css"

function Header() {
  const [theme, setTheme] = useState(initialTheme)

  function handleThemeClick () {
    let newTheme
    if (theme === "light-mode") newTheme = "dark-mode"
    else if (theme === "dark-mode") newTheme = "light-mode"

    window.localStorage.setItem("theme", newTheme)
    setTheme(newTheme)    
  }

  useEffect(() => {
    if (theme === "dark-mode") {
      document.body.classList.add("dark-mode")
      document.body.classList.remove("light-mode")
    }
    else if (theme === "light-mode") {
      document.body.classList.add("light-mode")
      document.body.classList.remove("dark-mode")
    }
  }, [theme])

  return (
    <header className="header">
      <h1 className="logo">Todo</h1>
      <button className="switch-theme" onClick={handleThemeClick}>
        {theme === "dark-mode"
          ? <img src="/images/icon-sun.svg" alt="" />
          : <img src="/images/icon-moon.svg" alt="" />
        }
      </button>
    </header>
  )
}

const initialTheme = window.localStorage.getItem("theme") || "dark-mode"

export default Header