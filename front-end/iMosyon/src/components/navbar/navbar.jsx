import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRight } from '@fortawesome/pro-solid-svg-icons'
import { useState, React } from 'react'
import { motion } from 'framer-motion'

import '@fontsource/poppins'
import '@fontsource/noto-sans'
import './navbar.scss'

import { BtnLightCircle } from '@/components/buttons/button.jsx'
// import { Route, useNavigate } from 'react-router-dom'

const Navbar = () => {
  function redirectTo(path = '/') {
    window.location.href = path
  }

  const [arrowStyle, setArrowStyle] = useState({
    fontSize: '1.0rem',
  })

  const rotateArrowStraight = () => {
    setArrowStyle((arrowStyle) => {
      return {
        ...arrowStyle,
        transform: 'rotate(45deg)',
      }
    })
  }
  const rotateArrowUp = () => {
    setArrowStyle((arrowStyle) => {
      return {
        ...arrowStyle,
        transform: 'rotate(0deg)',
      }
    })
  }

  return (
    <div className={'navbar-wrapper'}>
      <nav className="navbar">
        <div className="navbar-brand">
          <a href="#" className="brand">
            iMosyon
          </a>
          <a href="#">Home</a>
          <a href="#system-description">How it works?</a>
          <a href="#">About Us</a>
        </div>

        <div className="navbar-action">
          <a href="/register/">Sign Up</a>
          <motion.span
            onHoverStart={rotateArrowStraight}
            onHoverEnd={rotateArrowUp}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.5,
              },
            }}
            initial={{ opacity: 0 }}
          >
            <BtnLightCircle
              size="btnd-md"
              width="btnd-sm-w"
              show_on_small="true"
              onClick={() => redirectTo('/login/')}
            >
              Login &nbsp;
              <FontAwesomeIcon icon={faArrowUpRight} style={arrowStyle} />
              &nbsp;
            </BtnLightCircle>
          </motion.span>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
