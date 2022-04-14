import { React, useEffect, useState } from 'react'
import AuthPage from '@/components/auth-user/AuthPage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLockKeyhole } from '@fortawesome/pro-regular-svg-icons'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  // const [usernameError, setUsernameError] = useState('')
  // const [passwordError, setPasswordError] = useState('')

  useEffect(() => {
    document.title = 'Login | iMosyon'
    document.getElementsByTagName('body')[0].classList.add('main')
  })

  const left = {
    emoji: ['😎', '🔥', '😆'],
    heading: 'iMosyon',
    message: "We're glad that you're back!",
  }

  const right = {
    title: 'Welcome Back!',
    message:
      'Please enter your username and password to use our system and save your results',
    inputFields: [
      {
        label: 'Username or Email',
        type: 'text',
        icon: <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>,
        value: username,
        onchange: (e) => setUsername(e.target.value),
        error: '',
        required: true,
      },
      {
        label: 'Password',
        type: 'password',
        icon: <FontAwesomeIcon icon={faLockKeyhole}></FontAwesomeIcon>,
        value: password,
        onchange: (e) => setPassword(e.target.value),
        required: true,
        error: '',
        remember: {
          label: 'Remember me',
          onChange: () => setRemember(!remember),
          checked: remember,
          name: 'remember',
        },
      },
    ],
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

export default Login
