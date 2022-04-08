import React from 'react'

export const Input = ({ ...props }) => {
  return (
    <div className="input-text">
      <label htmlFor={props.id}>{props.label}</label>
      <input {...props} />
    </div>
  )
}

export default Input
