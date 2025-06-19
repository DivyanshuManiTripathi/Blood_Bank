import { useState } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
 import { ToastContainer, toast } from 'react-toastify';
import ProtectedRoute from './components/Routes/ProtectedRoute.jsx'
import PublicRoute from './components/Routes/PublicRoute.jsx'
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <Routes>
      <Route path='/' element={
        <ProtectedRoute>
        <HomePage/>
        </ProtectedRoute>
        }></Route>
      <Route path='/login' element={
        <PublicRoute>
          <Login/>
        </PublicRoute>
        }/>
       <Route path='/register' element={
        <PublicRoute>
           <Register/>
        </PublicRoute>
       }/>
    </Routes>
    <ToastContainer />
    </>
  )
}

export default App
