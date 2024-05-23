import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import BuyMain from "./components/BuyMain"
import SellForm from "./components/SellForm"

import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {useState} from 'react'

function App(){
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element = {<Login/>}/>
          <Route path="/signup" element = {<Signup/>}/>
          <Route path="/home" element = {<Home/>}/>
          <Route path="/buymain" element={<BuyMain />} />
          <Route path="/sellform" element={<SellForm />} />

        </Routes>
      </Router>
    </div>
  )

}

export default App