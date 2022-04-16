import { React, useEffect, useState } from 'react'
import AuthPage from '@/components/auth-user/AuthPage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer, toast } from 'react-toastify'
import {
  faAt,
  faUser,
  faUserHair,
  faUserSecret,
} from '@fortawesome/pro-regular-svg-icons'
import { faCircleNotch } from '@fortawesome/pro-solid-svg-icons'

import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

export const SignUp = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [emailError, setEmailError] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [signUpMessage, setSignUpMessage] = useState(
    'Account successfully created',
  )

  const [sending, setSending] = useState(false)
  const notify = (error = false) => {
    if (error) {
      toast.error(signUpMessage)
    } else {
      toast.success(signUpMessage, {
        onClose: () => {
          window.location.href = '/login/'
        },
      })
    }
  }

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
      type: 'email',
      icon: <FontAwesomeIcon icon={faAt}></FontAwesomeIcon>,
      value: email,
      onchange: (e) => setEmail(e.target.value),
      error: emailError,
      required: true,
    },
    {
      label: 'Username',
      type: 'text',
      icon: <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>,
      value: username,
      onchange: (e) => setUsername(e.target.value),
      error: usernameError,
      required: true,
    },
    {
      label: 'Password',
      type: 'password',
      icon: <FontAwesomeIcon icon={faUserSecret}></FontAwesomeIcon>,
      value: password,
      onchange: (e) => setPassword(e.target.value),
      required: true,
      error: passwordError,
    },
    {
      label: 'Confirm Password',
      type: 'password',
      icon: <FontAwesomeIcon icon={faUserSecret}></FontAwesomeIcon>,
      value: confirmPassword,
      onchange: (e) => setConfirmPassword(e.target.value),
      required: true,
      error: confirmPasswordError,
    },
  ]

  useEffect(() => {
    document.title = 'Register | iMosyon'
    document.getElementsByTagName('body')[0].classList.add('main')
  })

  useEffect(() => {
    usernameError ? setUsernameError('') : null
  }, [username])

  useEffect(() => {
    emailError ? setEmailError('') : null
  }, [email])

  useEffect(() => {
    if (confirmPassword.length >= password.length) {
      password == confirmPassword
        ? setConfirmPasswordError('')
        : setConfirmPasswordError(
            'Password and Confirm Password must be match.',
          )
    }
  }, [confirmPassword, password])

  function submitRegister(e) {
    e.preventDefault()

    if (password != confirmPassword) {
      setConfirmPasswordError('Password and Confirm Password must be match.')
    }

    setSending(true)
    axios({
      url: '/api/user/register',
      method: 'POST',
      data: {
        name: fullName,
        email: email,
        username: username,
        password: password,
      },
      withCredentials: true,
    })
      .then((response) => {
        setSending(false)
        let data = response.data
        if ('message' in data) {
          setSignUpMessage(data.message)
        } else {
          setSignUpMessage('Account successfully created')
        }
        notify()
      })
      .catch((error) => {
        setSending(false)
        let data = error.response.data
        if ('field' in data) {
          if (data.field == 'email') {
            setEmailError(data.message)
          } else if (data.field == 'username') {
            setUsernameError(data.message)
          }
        } else {
          setSignUpMessage(data.message)
          notify(true)
        }
      })
  }

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
      'Sign Up'
    ),
    errors:
      emailError != '' ||
      usernameError != '' ||
      passwordError != '' ||
      confirmPasswordError != ''
        ? true
        : false,
    submitHandler: submitRegister,
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

export default SignUp
