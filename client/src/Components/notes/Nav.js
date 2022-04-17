import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({setIsLogin}) => {

  const logoutSubmit =() => {
    localStorage.clear()
    setIsLogin(false)
  }
  return (
    <header>
      <div className='logo'>
        <h1><Link to="/" >Notes</Link></h1>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/create">Create Note</Link></li>
        <li onClick={logoutSubmit}><Link to="/">Logout</Link></li>
      </ul>
    </header>
  )
}

export default Nav