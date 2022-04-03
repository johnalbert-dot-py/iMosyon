import '@fontsource/poppins';
import '@fontsource/noto-sans';
import { BtnLightCircle, BtnLightCircleOutline, BtnBurger } from '@/components/buttons/button.jsx'
import './navbar.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRight } from '@fortawesome/pro-solid-svg-icons';
import { useState, useEffect } from 'react';


const Navbar = () => {

  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <div className={"navbar-wrapper " + (isScrolled ? ' bg-dark' : '') + ""}>
      <nav className='navbar'>
        <div className="navbar-brand">
          <a href="#" className="brand">
            iMosyon
          </a>
          <a href="#">
            Home
          </a>
          <a href="#system-description">
            How it works?
          </a>
          <a href="#">
            About Us
          </a>
        </div>

        <div className="navbar-action">
          <a href="#">
            Sign Up
          </a>

          <BtnLightCircle size="btn-md" width="btn-sm-w" show_on_small="true">
            Login &nbsp;<FontAwesomeIcon icon={faArrowUpRight} />
          </BtnLightCircle>

          <BtnBurger size="btn-md" show_on_small="true" />
        </div>
      </nav>
    </div>
  )
}

export default Navbar;