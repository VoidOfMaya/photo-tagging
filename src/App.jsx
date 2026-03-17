import { useState } from 'react'
import {Outlet} from 'react-router-dom'
import { Topnav } from './components/topnav/topnav'

function App() {


  return (
    <>
    <Topnav />
    <Outlet />
    </>
  )
}

export default App
