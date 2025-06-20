import React from 'react'
import { userMenu } from './userMenu'
import {useLocation,Link} from 'react-router-dom'
import '../../../../styles/Layout.css'
const Sidebar = () => {
  const location=useLocation();
  return (
    <div>
        <div className="sidebar">
            <div className="menu">
              {userMenu.map((menu)=>{
                 const isAlive=location.pathname === menu.path;
                 return (
                  <div className={`menu-item ${isAlive? 'active' : ''}`}>
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                 )
              })}
            </div>
        </div>
    </div>
  )
}

export default Sidebar