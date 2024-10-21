import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import RealTimeEditor from './pages/RealTimeEditor';


function App() {
 

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/create" element={<RealTimeEditor/>} />

      </Routes>
    </>
  )
}

export default App
