import React from 'react'
import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from 'react-router-dom'
import TopBar from './TopNav'
const Layout = () => {
  return (
    <>
      <div className="topbar">
        <TopBar />
      </div>

      <div className="moho"><Header /></div>
      <Outlet />
      <div className="mofo"><Footer /></div>

    </>
  )
}

export default Layout