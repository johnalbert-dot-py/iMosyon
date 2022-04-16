import React from 'react'

import './buttons.scss'
import burger from '@/assets/burger.svg'

export const BtnLight = ({ ...props }) => {
  return (
    <button
      className={`btnd btnd-light ${props.size} ${
        props.width ? props.width : ''
      } show-${props.show_on_small ? 'true' : 'false'}`}
      {...props}
    >
      {props.children}
    </button>
  )
}

export const BtnLightCircle = ({ ...props }) => {
  return (
    <button
      className={`btnd btnd-light btnd-circle ${props.size} ${
        props.width ? props.width : ''
      } show-${props.show_on_small ? 'true' : 'false'}`}
      {...props}
    >
      {props.children}
    </button>
  )
}

export const BtnLightCircleOutline = ({ ...props }) => {
  return (
    <button
      className={`btnd btnd-light-outline btnd-circle ${props.size} ${
        props.width ? props.width : ''
      } show-${props.show_on_small ? 'true' : 'false'}`}
      {...props}
    >
      {props.children}
    </button>
  )
}

export const BtnBurger = ({ ...props }) => {
  return (
    <a
      href="#"
      className={`btnd btnd-burger ${props.size} ${
        props.width ? props.width : ''
      } show-${props.show_on_small ? 'true' : 'false'}`}
      {...props}
    >
      <img src={burger} />
    </a>
  )
}

export const BtnDark = ({ ...props }) => {
  return (
    <button
      className={`btnd btnd-dark ${props.size} ${
        props.width ? props.width : ''
      } show-${props.show_on_small ? 'true' : 'false'}`}
      {...props}
    >
      {props.children}
    </button>
  )
}
