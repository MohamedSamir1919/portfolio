import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home'
import './App.css'
import About from './pages/About';
const App = () => {
  return (
<Routes>

  <Route element={<MainLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Route>

  
</Routes>
  )
}

export default App
