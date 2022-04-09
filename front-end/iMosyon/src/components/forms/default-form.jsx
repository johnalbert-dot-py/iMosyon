import { React } from 'react'
import './form.scss'

export const CheckBox = ({ onChange, checked, label, name }) => {
  return (
    <div className="checkfield">
      <input type="checkbox" id={name} onChange={onChange} checked={checked} />
      <span className="custom-checkbox"></span>
      <label htmlFor={name}>{label}</label>
    </div>
  )
}

export const DefaultForm = ({ children }) => {
  return <div className="input-form">{children}</div>
}
