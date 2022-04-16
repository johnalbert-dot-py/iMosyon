import { React } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCloudArrowUp,
  faCog,
  faHouse,
  faUserHair,
} from '@fortawesome/pro-solid-svg-icons'
import imosyonBanner from '@/assets/iMosyon-banner.svg'

export const Sidebar = (props) => {
  return (
    <div className="bg-secondary-dark text-primary-white hidden md:flex flex-col absolute h-screen justify-start items-center md:w-40 lg:w-[20%]">
      <h2 className="self-center pt-10 pb-10 text-3xl font-secondary font-semibold">
        iMosyon
      </h2>

      <div className="flex flex-col gap-4 w-4/6 mt-6">
        <a href="#">
          <div className="w-100 bg-primary-dark py-4 px-6 flex flex-row justify-start items-center gap-4 rounded-lg drop-shadow-xl">
            <FontAwesomeIcon icon={faHouse} />
            <span
              href="#"
              className="mt-[3px] font-primary font-bold tracking-[0.005em]"
            >
              Home
            </span>
          </div>
        </a>

        <a href="#">
          <div className="w-100  py-4 px-6 flex flex-row justify-start items-center gap-4 rounded-lg">
            <FontAwesomeIcon icon={faUserHair} />
            <span className="mt-[2px] font-primary font-bold tracking-[0.005em]">
              Profile
            </span>
          </div>
        </a>

        <a href="#">
          <div className="w-100 py-4 px-6 flex flex-row justify-start items-center gap-4 rounded-lg">
            <FontAwesomeIcon icon={faCog} />
            <span
              href="#"
              className="mt-[2px] font-primary font-bold tracking-[0.005em]"
            >
              Settings
            </span>
          </div>
        </a>
      </div>

      <div className="mt-[40%]">
        <img src={imosyonBanner} className="w-50 h-auto" alt="iMosyon Banner" />
      </div>
      <div className="mt-[6%]">
        <button>
          <FontAwesomeIcon icon={faCloudArrowUp} />
          Upload Now
        </button>
      </div>
    </div>
  )
}

export default Sidebar
