import React from 'react'
import { BiDonateBlood } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom'
const Header = () => {
  const {user}=useSelector(state=>state.auth)
  const navigate=useNavigate();
  // logout handler
  const handleLogout =()=>{
      localStorage.clear();
       toast.success('Logout Successfully');
      navigate('/login');
  }
  return (
    <>
      <nav className='navbar  '>
        <div className="container-fluid">
            <div className="navbar-brand ">
                <BiDonateBlood color='red' />
                Blood Bank App
            </div>
            <ul className="navbar-nav flex-row">
                <li className="nav-item mx-3">
                    <p className="nav-link">
                        <FaUser />
                        Welcome {user?.name}
                    </p>
                </li>
                 <li className="nav-item mx-3">
                    <button className="btn btn-danger " onClick={handleLogout}>
                        Logout
                    </button>
                </li>
            </ul>
        </div>
      </nav>
    </>
  )
}

export default Header