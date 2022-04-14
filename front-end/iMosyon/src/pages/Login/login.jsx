import { React, useEffect, useState, useContext } from 'react'
import AuthPage from '@/components/auth-user/AuthPage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLockKeyhole } from '@fortawesome/pro-regular-svg-icons'
import axios from 'axios'
import { UserAuthContext } from '../../context/UserAuth'

export const Login = () => {
  const [userAuth, setUserAuth] = useContext(UserAuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  const [usernameError, setUsernameError] = useState('')
  // const [passwordError, setPasswordError] = useState('')

  useEffect(() => {
    document.title = 'Login | iMosyon'
    document.getElementsByTagName('body')[0].classList.add('main')
  })
  useEffect(() => {
    usernameError ? setUsernameError('') : null
  }, [username, password])

  function submitLogin(e) {
    e.preventDefault()
    axios({
      method: 'POST',
      url: '/api/user/login',
      data: { username, password, remember },
      withCredentials: true,
    })
      .then((response) => {
        console.log(response.headers)
        let data = response.data
        setUserAuth({
          logged_in: data.success,
          expired_on: data.expired_on,
        })
      })
      .catch((error) => {
        setUsernameError(error.response.data.message)
      })
  }

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
        error: usernameError,
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
    submitHandler: submitLogin,
  }

  return (
    <>
      <AuthPage left={left} right={right} />
    </>
  )
}

export default Login
