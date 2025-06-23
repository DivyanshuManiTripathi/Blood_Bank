import { useState } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
 import { ToastContainer, toast } from 'react-toastify';
import ProtectedRoute from './components/Routes/ProtectedRoute.jsx'
import PublicRoute from './components/Routes/PublicRoute.jsx'
import Donar from './pages/Dashboard/Donar.jsx'
import Hospitals from './pages/Dashboard/Hospitals.jsx'
import OrganizationPage from './pages/Dashboard/OrganizationPage.jsx'
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <Routes>
      <Route path='/hospital' element={
        <ProtectedRoute>
        <Hospitals/>
        </ProtectedRoute>
        }></Route>

        <Route path='/organization' element={
        <ProtectedRoute>
        <OrganizationPage/>
        </ProtectedRoute>
        }></Route>

        <Route path='/' element={
        <ProtectedRoute>
        <HomePage/>
        </ProtectedRoute>
        }></Route>

         <Route path='/donar' element={
        <ProtectedRoute>
        <Donar/>
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
