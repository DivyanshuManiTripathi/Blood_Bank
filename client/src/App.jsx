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
import Consumer from './pages/Dashboard/Consumer.jsx'
import Donation from './pages/Donation.jsx'
import Analytics from './pages/Dashboard/Analytics.jsx'
import DonarList from './pages/Admin/DonarList.jsx'
import HospitalList from './pages/Admin/HospitalList.jsx'
import OrgList from './pages/Admin/OrgList.jsx'
import AdminHome from './pages/Admin/AdminHome.jsx'
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
      
      <Route path='/admin' element={
        <ProtectedRoute>
        <AdminHome/>
        </ProtectedRoute>
        }></Route>

         <Route path='/donar-list' element={
        <ProtectedRoute>
        <DonarList/>
        </ProtectedRoute>
        }></Route>

         <Route path='/hospital-list' element={
        <ProtectedRoute>
        <HospitalList/>
        </ProtectedRoute>
        }></Route>

         <Route path='/org-list' element={
        <ProtectedRoute>
        <OrgList/>
        </ProtectedRoute>
        }></Route>

        <Route path='/analytics' element={
        <ProtectedRoute>
        <Analytics/>
        </ProtectedRoute>
        }></Route>

        <Route path='/consumer' element={
        <ProtectedRoute>
        <Consumer/>
        </ProtectedRoute>
        }></Route>

         <Route path='/donation' element={
        <ProtectedRoute>
        <Donation/>
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


      <Route path='/' element={
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
