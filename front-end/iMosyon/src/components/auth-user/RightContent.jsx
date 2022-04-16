import React from 'react'
import { DefaultForm, CheckBox } from '../forms/default-form'
import { BtnDark } from '@/components/buttons/button.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons'
import styled from 'styled-components'

import './main.scss'
const GoHome = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 10px;
  font-size: 14px;
  font-family: 'Noto Sans', sans-serif;
  color: #004fe9 !important;
  width: auto;
  float: right;
`

const GoToSignup = styled.a`
  font-family: 'Noto Sans', sans-serif;
  color: #004fe9 !important;
  width: auto;
  margin-left: 5px;
`

export const RightContent = ({
  title,
  message,
  inputFields,
  submitHandler,
  buttonContent,
  errors,
}) => {
  return (
    <>
      <div className="right-content">
        <div className="content">
          <h1>{title}</h1>
          <p className="message">{message}</p>
          <DefaultForm submit={submitHandler}>
            {inputFields.map((field, index) => {
              return (
                <>
                  <div key={index} className={'input'}>
                    <input
                      type={field.type}
                      onChange={field.onchange}
                      value={field.value}
                      required={field.required}
                      placeholder=" "
                      className={field.error != '' ? 'input-error' : ''}
                    />
                    <label className={field.error != '' ? ' input-error' : ''}>
                      {field.label}
                    </label>
                    <span
                      className={
                        'input-icon' + (field.error != '' ? ' icon-error' : '')
                      }
                    >
                      {field.icon}
                    </span>
                  </div>
                  {field.error != '' ? (
                    <>
                      <div className="small">
                        <span className="error">{field.error}</span>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {field.remember ? (
                    <div className="small">
                      <CheckBox {...field.remember} />
                      <a href="#" className="forgot">
                        Forgot Password?
                      </a>
                    </div>
                  ) : null}
                </>
              )
            })}
            <BtnDark
              size="btnd-md"
              width="btnd-lg-100"
              type="submit"
              show_on_small="true"
              disabled={errors}
            >
              {(() => {
                if (buttonContent) {
                  return buttonContent
                } else {
                  return window.location.pathname == '/login/' ? (
                    <>Login</>
                  ) : (
                    <>Sign Up</>
                  )
                }
              })()}
            </BtnDark>
            <GoHome href="/">
              <FontAwesomeIcon icon={faArrowLeft} />
              Go back to Home
            </GoHome>
          </DefaultForm>
        </div>
      </div>
      <div></div>
      <div className="content-footer">
        {window.location.pathname.includes('/login') ? (
          <>
            <span>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Don't have an account yet?
              <GoToSignup href="/register/">Sign Up</GoToSignup>
            </span>
          </>
        ) : (
          <span>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Already have an account?
            <GoToSignup href="/login/">Login</GoToSignup>
          </span>
        )}
      </div>
    </>
  )
}

export default RightContent
