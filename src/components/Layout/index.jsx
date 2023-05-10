import React from 'react'
import Sidebar from '../Sidebar';
import Workspace from '../Workspace';

function Layout() {
  return (
    <div className='layout'>
        {/* <div className="wrapper layout__wrapper"> */}
            <Sidebar />
            <Workspace />
        {/* </div> */}
    </div>
  )
}

export default Layout