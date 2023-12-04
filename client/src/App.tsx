
import HomePage from './components/Homepage/HomePage'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Login from './components/Navbar/Login'

import './App.scss'
import Signup from './components/Navbar/Signup'
const App = () => {
  return (
    <>
     
      
        <BrowserRouter>
       <Navbar/ > 
        <Routes>
        
          <Route path="/" element={<HomePage/>} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      
       
        <Footer/>

        </BrowserRouter>
     
    </>
  )
}

export default App
