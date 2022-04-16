import { React, useEffect } from 'react'
// import './index.css'
import Sidebar from '@/components/dashboard/sidebar.jsx'

export const Dashboard = (props) => {
  useEffect(() => {
    document.title = 'Dashboard | iMosyon'
  })

  return (
    <div className="p-0">
      <Sidebar />
    </div>
  )
}

export default Dashboard
