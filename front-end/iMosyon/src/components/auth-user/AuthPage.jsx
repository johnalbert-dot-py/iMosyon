import React from 'react'
import LeftSideBackground from './LeftSideBackground'
import LeftContent from './LeftContent'
import RightContent from './RightContent'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/pro-light-svg-icons'

import './main.scss'

export const AuthPage = ({ left, right }) => {
  return (
    <>
      <LeftSideBackground />
      <div className="contents">
        <div className="home-nav">
          <a href="/">
            <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>
          </a>
        </div>
        <LeftContent
          emoji={left.emoji}
          heading={left.heading}
          message={left.message}
        />
        <RightContent
          title={right.title}
          message={right.message}
          inputFields={right.inputFields}
        />
      </div>
    </>
  )
}

export default AuthPage
