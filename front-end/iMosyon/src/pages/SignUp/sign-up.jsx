import { React, useEffect, useState } from 'react'
import AuthPage from '@/components/auth-user/AuthPage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAt,
  faUser,
  faUserHair,
  faUserSecret,
} from '@fortawesome/pro-regular-svg-icons'

export const SignUp = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const registerInputFields = [
    {
      label: 'Full Name',
      type: 'text',
      icon: <FontAwesomeIcon icon={faUserHair}></FontAwesomeIcon>,
      value: fullName,
      onchange: (e) => setFullName(e.target.value),
      error: '',
      required: true,
    },
    {
      label: 'Email',
      type: 'text',
      icon: <FontAwesomeIcon icon={faAt}></FontAwesomeIcon>,
      value: email,
      onchange: (e) => setEmail(e.target.value),
      error: '',
      required: true,
    },
    {
      label: 'Username',
      type: 'text',
      icon: <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>,
      value: username,
      onchange: (e) => setUsername(e.target.value),
      error: '',
      required: true,
    },
    {
      label: 'Password',
      type: 'password',
      icon: <FontAwesomeIcon icon={faUserSecret}></FontAwesomeIcon>,
      value: password,
      onchange: (e) => setPassword(e.target.value),
      required: true,
      error: '',
    },
    {
      label: 'Confirm Password',
      type: 'password',
      icon: <FontAwesomeIcon icon={faUserSecret}></FontAwesomeIcon>,
      value: confirmPassword,
      onchange: (e) => setConfirmPassword(e.target.value),
      required: true,
      error: '',
    },
  ]

  useEffect(() => {
    document.title = 'Register | iMosyon'
    document.getElementsByTagName('body')[0].classList.add('main')
  })

  const left = {
    emoji: ['😎', '🔥', '😆'],
    heading: 'iMosyon',
    message: 'Welcome to our system!',
  }

  const right = {
    title: 'Hello There!',
    message:
      'It seem you are new to our system. Please fill out the information that are required then start using our system 100%.',
    inputFields: [...registerInputFields],
    errors: false,
    submitHandler: (event) => {
      event.preventDefault()
      console.log(username, password)
    },
  }

  return (
    <>
      <AuthPage left={left} right={right} />
    </>
  )
}

export default SignUp
