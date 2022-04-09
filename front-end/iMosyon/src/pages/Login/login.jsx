import { React, useEffect, useState } from 'react'
import AuthPage from '@/components/auth-user/AuthPage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLockKeyhole } from '@fortawesome/pro-regular-svg-icons'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  useEffect(() => {
    document.title = 'Login | iMosyon'
    document.getElementsByTagName('body')[0].classList.add('main')
  })

  const left = {
    emoji: ['😎', '🔥', '😆'],
    heading: 'iMosyon',
    message: 'Welcome to our system!',
  }

  const right = {
    title: 'Welcome Back!',
    message:
      'Please enter your username and password to use our system and save your results',
    inputFields: [
      {
        label: 'Username or Email',
        type: 'email',
        icon: <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>,
        value: username,
        onchange: (e) => setUsername(e.target.value),
      },
      {
        label: 'Password',
        type: 'password',
        icon: <FontAwesomeIcon icon={faLockKeyhole}></FontAwesomeIcon>,
        value: password,
        onchange: (e) => setPassword(e.target.value),
        remember: {
          label: 'Remember me',
          onChange: () => setRemember(!remember),
          checked: remember,
          name: 'remember',
        },
      },
    ],
  }

  return (
    <>
      <AuthPage left={left} right={right} />
    </>
  )
}

export default Login
