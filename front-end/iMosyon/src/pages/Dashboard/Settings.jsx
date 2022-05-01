import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

// import Cookies from 'js-cookie'

import Sidebar from '@/components/dashboard/sidebar'
import MainContent from '@/components/dashboard/main-content'
import Navbar from '@/components/dashboard/navbar'
// import Loading from '@/components/dashboard/loading'
// import Error from '@/components/dashboard/error'

import AccountInfo from '@/components/dashboard/settings/AccountInfo'
import PasswordSettings from '@/components/dashboard/settings/PasswordSettings'

import './index.css'
import 'react-toastify/dist/ReactToastify.css'
// import axios from 'axios'

export const Settings = (props) => {
  const [settingsPage, setSettingsPage] = useState('general')

  useEffect(() => {
    document.title = 'Dashboard | iMosyon'
  })

  const notify = ({ message, error }) => {
    if (error) {
      toast.error(message)
    } else {
      toast.success(message, {})
    }
  }

  const navigate = useNavigate()
  return (
    <div className="p-0 overflow-x-hidden">
      <Sidebar />
      <MainContent>
        <Navbar></Navbar>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <h2 className="text-4xl mb-1 text-primary-white font-sans font-semibold">
          Account Settings
        </h2>
        <p className="text-placeholder font-primary font-semibold">
          Change your account settings here.
        </p>

        <div className="bg-secondary-dark w-100 h-auto rounded-md mt-8">
          <div className="grid overflow-hidden auto-cols-fr grid-rows-1 gap-2">
            <div className="p-9 flex flex-col gap-7 border-r border-r-solid border-r-[rgba(255,255,255,0.2)]">
              <a
                href="#"
                className={`font-sans font-semibold text-xl hover:text-primary-white text-primary-white ${
                  settingsPage != 'general' ? 'text-opacity-50' : null
                }`}
                onClick={() => {
                  settingsPage != 'general' ? setSettingsPage('general') : null
                }}
              >
                General
              </a>
              <a
                href="#"
                className={`font-sans font-semibold text-xl hover:text-primary-white text-primary-white ${
                  settingsPage != 'password' ? 'text-opacity-50' : null
                }`}
                onClick={() => {
                  settingsPage != 'password'
                    ? setSettingsPage('password')
                    : null
                }}
              >
                Password
              </a>
            </div>
            <div className="col-start-2 col-span-4 p-5 min-h-[350px]">
              {settingsPage == 'general' ? (
                <AccountInfo notify={notify} />
              ) : (
                <PasswordSettings notify={notify} />
              )}
            </div>
          </div>
        </div>
      </MainContent>
    </div>
  )
}

export default Settings
