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
      <div className="auth-content">
        <div className="home-nav">
          <a href="/" className="d-animate">
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
          submitHandler={right.submitHandler}
          buttonContent={right.buttonContent}
          errors={right.errors}
        />
      </div>
    </>
  )
}

export default AuthPage
