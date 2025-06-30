import React from 'react';
// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import DegreePlanner from './pages/DegreePlanner';
import CreatePlanPage from './pages/CreatePlanPage';

function App() {
  // const [count, setCount] = useState(0)
  
  return (
    <Routes>
      <Route path="/create-plan" element={<CreatePlanPage />}/>
      <Route path="/planner/planId" element={<DegreePlanner />} />
    </Routes>
  )
}

export default App
