import React from 'react'
import Navigation from '../../containers/Nav'
import Auth from '../../containers/AuthContainer'
import './Sidebar.less'

const Sidebar = () => (
  <div className='sidebar' >
    <Auth />
    <Navigation />
  </div>
)
export default Sidebar
