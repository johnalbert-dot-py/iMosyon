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

export const RightContent = ({ title, message, inputFields }) => {
  return (
    <>
      <div className="right-content">
        <div className="content">
          <h1>{title}</h1>
          <p className="message">{message}</p>
          <DefaultForm>
            {inputFields.map((field, index) => {
              return (
                <>
                  <div key={index} className="input">
                    <input
                      type={field.type}
                      onChange={field.onchange}
                      value={field.value}
                      placeholder=" "
                    />
                    <label>{field.label}</label>
                    <span className="input-icon">{field.icon}</span>
                  </div>
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
            <BtnDark size="btn-md" width="btn-lg-100" show_on_small="true">
              Login
            </BtnDark>
            <a href="#">
              <GoHome>
                <FontAwesomeIcon icon={faArrowLeft} />
                Go back to Home
              </GoHome>
            </a>
          </DefaultForm>
        </div>
      </div>
      <div></div>
      <div className="content-footer">
        {window.location.pathname == '/login/' ? (
          <>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <span>Don't have an account yet? Sign Up</span>
          </>
        ) : (
          <>Sign Up</>
        )}
      </div>
    </>
  )
}

export default RightContent
