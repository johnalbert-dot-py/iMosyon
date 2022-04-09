import React from 'react'
import { DefaultForm } from '../forms/default-form'

import './main.scss'

export const RightContent = ({ title, message, inputFields }) => {
  return (
    <div className="right-content">
      <div className="content">
        <h1>{title}</h1>
        <p className="message">{message}</p>
        <DefaultForm>
          {inputFields.map((field, index) => {
            return (
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
            )
          })}
        </DefaultForm>
      </div>
    </div>
  )
}

export default RightContent
