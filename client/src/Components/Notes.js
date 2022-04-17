import React from 'react'
import CreateNote from './notes/CreateNote'
import EditNote from './notes/EditNote'
import Home from './notes/Home'
import Header from './notes/Nav'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'


const Notes = ({setIsLogin}) => {
  return (
    <Router>
      <div className='notes-page'>
        <Header setIsLogin={setIsLogin}/>
        <Routes>
          <Route exaxt path="/" element={<Home />} />
          <Route exact path="/create" element={<CreateNote />} />
          <Route exact path="/edit/:id" element={<EditNote />}  />
        </Routes>
      </div>
    </Router>
  )
}

export default Notes