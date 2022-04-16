import { React, useEffect, useState, useContext } from 'react'
import { UserAuthContext } from '../../context/UserAuth'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

import AuthPage from '@/components/auth-user/AuthPage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLockKeyhole } from '@fortawesome/pro-regular-svg-icons'
import { faCircleNotch } from '@fortawesome/pro-solid-svg-icons'
import 'react-toastify/dist/ReactToastify.css'

export const Login = () => {
  const [userAuth, setUserAuth] = useContext(UserAuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loginMessage, setLoginMessage] = useState('')

  const [sending, setSending] = useState(false)
  const notify = (error = false) => {
    if (error) {
      toast.error(loginMessage)
    } else {
      toast.success(loginMessage, {
        onClose: () => {
          window.location.href = '/user/dashboard/'
        },
      })
    }
  }

  useEffect(() => {
    document.title = 'Login | iMosyon'
    document.getElementsByTagName('body')[0].classList.add('main')
  })
  useEffect(() => {
    usernameError ? setUsernameError('') : null
    passwordError ? setPasswordError('') : null
  }, [username, password])

  function submitLogin(e) {
    e.preventDefault()
    setSending(true)
    axios({
      method: 'POST',
      url: '/api/user/login',
      data: { username, password, remember },
      withCredentials: true,
    })
      .then((response) => {
        let data = response.data
        setSending(false)
        setLoginMessage(data.message)
        notify()
        setUserAuth({
          logged_in: true,
          expired_on: data.expired_on,
        })
      })
      .catch((error) => {
        console.log(error)
        setSending(false)
        let data = error.response.data ? error.response.data : null
        if ('field' in data) {
          if (data.field === 'username') {
            setUsernameError(data.message)
          } else if (data.field === 'password') {
            setPasswordError(data.message)
          }
        }
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
        error: passwordError,
        remember: {
          label: 'Remember me',
          onChange: () => setRemember(!remember),
          checked: remember,
          name: 'remember',
        },
      },
    ],
    buttonContent: sending ? (
      <FontAwesomeIcon
        icon={faCircleNotch}
        className="fa-spin"
        size="lg"
        style={{
          color: 'rgba(255,255,255,0.8)',
        }}
      />
    ) : (
      'Login Up'
    ),
    errors: usernameError ? true : false,
    submitHandler: submitLogin,
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <AuthPage left={left} right={right} />
    </>
  )
}

export default Login
