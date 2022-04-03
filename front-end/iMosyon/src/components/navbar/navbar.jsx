import '@fontsource/poppins';
import '@fontsource/noto-sans';
import { BtnLightCircle, BtnLightCircleOutline, BtnBurger } from '@/components/buttons/button.jsx'
import './navbar.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRight, faArrowRight, faArrowUp } from '@fortawesome/pro-solid-svg-icons';
import { useState, useEffect } from 'react';

import {motion} from 'framer-motion';


const Navbar = () => {
  const arrowStyleDefault = {
    fontSize: '1.0rem',
  }
  const [arrowStyle, setArrowStyle] = useState(arrowStyleDefault);
  const rotateArrowStraight = () => {
    setArrowStyle(arrowStyle => {
      return {
        ...arrowStyle,
        transform: 'rotate(45deg)',
      }
    });
  }
  const rotateArrowUp = () => {
    setArrowStyle(arrowStyle => {
      return {
        ...arrowStyle,
        transform: 'rotate(0deg)',
      }
    });
  }

  return (
    <div className={"navbar-wrapper"}>
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
          <motion.span onHoverStart={rotateArrowStraight} onHoverEnd={rotateArrowUp} animate={{
            opacity: 1,
            transition: {
              duration: 0.5,
            }
          }} initial={{opacity: 0}}>
            <BtnLightCircle size="btn-md" width="btn-sm-w" show_on_small="true">
            Login &nbsp;<FontAwesomeIcon icon={faArrowUpRight} style={arrowStyle} /> &nbsp;
            </BtnLightCircle>
          </motion.span>

          <BtnBurger size="btn-md" show_on_small="true" />
        </div>
      </nav>
    </div>
  )
}

export default Navbar;