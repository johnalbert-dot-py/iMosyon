import '@fontsource/poppins';
import '@fontsource/noto-sans';

import { BtnLight, BtnLightCircleOutline } from '@/components/buttons/button.jsx'
import './navbar.scss'

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <div className="navbar-blur"></div>
      <div className="navbar">
        <div className="navbar-brand">
          <a href="#" class="brand">
            iMosyon
          </a>
          <a href="#">
            Home
          </a>
          <a href="#">
            About Us
          </a>
        </div>

        <div className="navbar-action">
          <a href="#">
            Sign Up
          </a>
          <BtnLightCircleOutline btnSize="btn-md">
            Login
          </BtnLightCircleOutline>
        </div>
      </div>
    </div>
  )
}

export default Navbar;