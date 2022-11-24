import React from 'react'
import Dashboard from '../Admin/Dashboard';
import Sidebar from '../Admin/sidebar';

const Layout = () => {
  return (
    <div className='layout-wrapper'>
    <div className='row'>
        <div className='col-lg-2 col-md-3'>
            <Sidebar />
        </div>
        <div className='col-lg-10 col-md-9'>
            <Dashboard />
        </div>
        </div>
    </div>
  )
}

export default Layout;