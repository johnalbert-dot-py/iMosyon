import React from 'react'

import './main.scss'

export const RightContent = ({ title, message, inputFields }) => {
  return (
    <div className="right-content">
      <h1>{title}</h1>
      {message}

      {inputFields.map((field) => {
        ;<div className="input-field">
          <label>{field.label}</label>
          <input
            type={field.type}
            placeholder={field.placeholder}
            ref={field.ref}
          />
          <span className="input-icon">{field.icon}</span>
        </div>
      })}
    </div>
  )
}

export default RightContent
