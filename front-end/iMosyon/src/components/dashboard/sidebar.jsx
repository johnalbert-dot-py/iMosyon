import { React, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import {
  faCloudArrowUp,
  faCog,
  faHouse,
  faUserHair,
} from '@fortawesome/pro-solid-svg-icons'
import imosyonBanner from '@/assets/iMosyon-banner.svg'

const HeadingBrand = styled.h1`
  background: rgb(14, 255, 212);
  background: linear-gradient(
    90deg,
    rgba(14, 255, 212, 1) 0%,
    rgba(199, 148, 236, 1) 65%
  );
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
`

export const Sidebar = ({ props }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activePage, seActivePage] = useState('')

  useEffect(() => {
    if (
      location.pathname == '/user/dashboard/' ||
      location.pathname == '/user/dashboard'
    ) {
      seActivePage('home')
    } else if (location.pathname.includes('/user/dashboard/profile')) {
      seActivePage('profile')
    } else if (location.pathname.includes('/user/dashboard/settings')) {
      seActivePage('settings')
    } else {
      //
    }
    console.log(location.pathname)
  }, [])

  useEffect(() => {
    console.log(activePage)
  }, [activePage])

  return (
    <div
      className={
        'bg-secondary-dark hidden fixed md:flex flex-col h-screen justify-start items-center md:w-40 lg:w-96'
      }
    >
      <HeadingBrand className="text-gradient self-center pt-20 pb-10 text-5xl font-secondary font-bold">
        iMosyon
      </HeadingBrand>

      <div className="flex flex-col gap-2 w-5/6 mt-6 mb-auto">
        <Link to="/user/dashboard/" replace>
          <div
            className={`transition-all w-100 py-4 px-6 flex flex-row justify-start items-center gap-4 rounded-lg ${
              activePage == 'home'
                ? ' bg-primary-dark drop-shadow-xl text-primary-white'
                : ' text-primary-white text-opacity-50 hover:text-opacity-70 hover:bg-primary-dark hover:bg-opacity-70'
            }`}
          >
            <FontAwesomeIcon icon={faHouse} className="text-[#0EFFD4]" />
            <span className="mt-[3px] font-primary font-bold tracking-[0.05em]">
              Home
            </span>
          </div>
        </Link>

        <Link to="/user/dashboard/profile">
          <div
            className={`transition-all w-100 py-4 px-6 flex flex-row justify-start items-center gap-4 rounded-lg ${
              activePage == 'profile'
                ? ' bg-primary-dark drop-shadow-xl text-primary-white'
                : ' text-primary-white text-opacity-50 hover:text-opacity-70 hover:bg-primary-dark hover:bg-opacity-70'
            }`}
          >
            <FontAwesomeIcon icon={faUserHair} className="text-[#43dd6f]" />
            <span className="mt-[2px] ml-1 font-primary font-bold tracking-[0.05em]">
              Profile
            </span>
          </div>
        </Link>

        <Link to="/user/dashboard/settings/">
          <div
            className={`transition-all w-100 py-4 px-6 flex flex-row justify-start items-center gap-4 rounded-lg ${
              activePage == 'settings'
                ? ' bg-primary-dark drop-shadow-xl text-primary-white'
                : ' text-primary-white text-opacity-50 hover:text-opacity-70 hover:bg-primary-dark hover:bg-opacity-70'
            }`}
          >
            <FontAwesomeIcon icon={faCog} className="text-[#a525cf]" />
            <span className="mt-[2px] ml-[1px] font-primary font-bold tracking-[0.05em]">
              Settings
            </span>
          </div>
        </Link>
      </div>

      <div className="self-center w-[75%] mb-5 ">
        <img
          src={imosyonBanner}
          className="w-[100%] h-auto "
          alt="iMosyon Banner"
        />
      </div>
      <div className="self-center pt-4 pb-8 w-3/5">
        <button
          onClick={() => navigate('/user/dashboard', { replace: true })}
          className="bg-primary-blue transition-all hover:bg-opacity-80 text-primary-white w-full p-4 flex flex-row gap-2 items-center rounded-lg justify-center drop-shadow-lg"
        >
          <FontAwesomeIcon icon={faCloudArrowUp} />
          Upload Now
        </button>
      </div>
    </div>
  )
}

export default Sidebar
