import React from 'react'
import Sidebar from '../Sidebar';
import Workspace from '../Workspace';

function Layout() {  
  return (
    <div className='layout'>
      <Sidebar />
      <Workspace />
    </div>
  )
}

export default Layout