import { React } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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

export const Sidebar = (props) => {
  return (
    <div className="bg-secondary-dark hidden md:flex flex-col absolute h-screen justify-start items-center md:w-40 lg:w-96">
      <HeadingBrand className="text-gradient self-center pt-20 pb-10 text-5xl font-secondary font-bold">
        iMosyon
      </HeadingBrand>

      <div className="flex flex-col gap-2 w-5/6 mt-6 mb-auto">
        <a href="#">
          <div className="ransition-all w-100 py-4 px-6 flex flex-row justify-start items-center gap-4 rounded-lg bg-primary-dark drop-shadow-xl">
            <FontAwesomeIcon icon={faHouse} className="text-[#0EFFD4]" />
            <span className="text-primary-white mt-[3px] font-primary font-bold tracking-[0.05em]">
              Home
            </span>
          </div>
        </a>

        <a href="#">
          <div className="transition-all w-100 py-4 px-6 flex flex-row justify-start items-center gap-4 rounded-lg text-primary-white text-opacity-50 hover:text-opacity-70 hover:bg-primary-dark hover:bg-opacity-70">
            <FontAwesomeIcon icon={faUserHair} className="text-[#43dd6f]" />
            <span className="mt-[2px] ml-1 font-primary font-bold tracking-[0.05em]">
              Profile
            </span>
          </div>
        </a>

        <a href="#">
          <div className="transition-all w-100 py-4 px-6 flex flex-row justify-start items-center gap-4 rounded-lg text-primary-white text-opacity-50 hover:text-opacity-70 hover:bg-primary-dark hover:bg-opacity-70">
            <FontAwesomeIcon icon={faCog} className="text-[#a525cf]" />
            <span className="mt-[2px] ml-[1px] font-primary font-bold tracking-[0.05em]">
              Settings
            </span>
          </div>
        </a>
      </div>

      <div className="self-center w-[75%] mb-5 ">
        <img
          src={imosyonBanner}
          className="w-[100%] h-auto "
          alt="iMosyon Banner"
        />
      </div>
      <div className="self-center pt-4 pb-8 w-3/5">
        <button className="bg-primary-blue transition-all hover:bg-opacity-80 text-primary-white w-full p-4 flex flex-row gap-2 items-center rounded-lg justify-center drop-shadow-lg">
          <FontAwesomeIcon icon={faCloudArrowUp} />
          Upload Now
        </button>
      </div>
    </div>
  )
}

export default Sidebar
