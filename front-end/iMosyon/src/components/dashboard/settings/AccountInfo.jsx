import { React, useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

export const AccountInfo = (props) => {
  const [user, setUser] = useState({
    name: '...',
    email: '...',
    username: '...',
  })

  const [usernameError, setUsernameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setEmailError('')
    setLoading(false)
  }, [user.email])

  useEffect(() => {
    setUsernameError('')
    setLoading(false)
  }, [user.username])

  const updateUser = async (e) => {
    e.preventDefault()
    setLoading(true)
    await axios({
      method: 'PUT',
      url: '/api/user/update',
      withCredentials: true,
      data: {
        name: user.name,
        email: user.email,
        username: user.username,
      },
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': Cookies.get('csrf_access_token'),
      },
    })
      .then((res) => {
        setLoading(false)
        props.notify({ message: res.data.message, error: false })
      })
      .catch((error) => {
        let res = error.response
        if (res.data.error) {
          res.data.error.forEach((err) => {
            if (err.field === 'username') {
              setUsernameError(err.message)
            } else if (err.field === 'email') {
              setEmailError(err.message)
            } else {
              console.log(err)
            }
          })
        } else {
          setLoading(false)
          props.notify({ message: error.response.data.message, error: true })
        }
      })
  }

  useEffect(() => {
    document.title = 'Account Settings | iMosyon'
    setLoading(true)
    if (
      user.name === '...' &&
      user.email === '...' &&
      user.username === '...'
    ) {
      axios({
        url: '/api/user/',
        method: 'GET',
        withCredentials: true,
      })
        .then((response) => {
          setLoading(false)
          setUser(response.data)
        })
        .catch((error) => {
          setLoading(false)
          console.log(error.response.data)
        })
    }
  }, [])

  return (
    <form className="h-full" onSubmit={updateUser}>
      <div className="flex flex-col gap-2 justify-center align-middle h-full">
        <div className="flex flex-row items-baseline gap-3 align-baseline">
          <div className="flex flex-col text-primary-white font-sans lg:w-3/4">
            <label htmlFor="full-name" className="text-md font-semibold mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="full-name"
              name="full-name"
              placeholder="Enter Full Name"
              value={user.name}
              onChange={(e) => {
                setUser({ ...user, name: e.target.value })
              }}
              required
              className="text-primary-white rounded-lg px-6 py-4 outline-none bg-[#222324]"
            />
          </div>
          <div className="flex flex-col text-primary-white font-sans lg:w-3/6">
            <label htmlFor="username" className="text-md font-semibold mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={(e) => {
                setUser({ ...user, username: e.target.value })
              }}
              required
              className={`border-none rounded-lg px-6 py-4 bg-[#222324] ${
                usernameError != ''
                  ? 'outline outline-1 outline-danger text-danger'
                  : 'text-primary-white outline-none'
              }`}
              placeholder="Enter Username"
            />
            <span
              className={`text-danger font-primary font-light text-sm ml-1 ${
                usernameError ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {usernameError ? usernameError : 'username error'}
            </span>
          </div>
        </div>
        <div className="flex flex-col text-primary-white font-sans lg:w-full">
          <label htmlFor="email" className="text-md font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value })
            }}
            required
            className={`text-primary-white border-none rounded-lg px-6 py-4 bg-[#222324] ${
              emailError != ''
                ? 'outline outline-1 outline-danger text-danger'
                : 'text-primary-white outline-none'
            }`}
          />
          <span
            className={`text-danger font-primary font-light text-sm ml-1 ${
              emailError ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {emailError ? emailError : 'email error'}
          </span>
        </div>
        <div className="flex flex-col text-primary-white font-sans lg:w-full">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary-blue transition-all hover:bg-opacity-80 active:bg-opacity-100  text-primary-white p-4 items-center rounded-lg drop-shadow-lg self-end w-1/6"
          >
            Save Changes
          </button>
        </div>
      </div>
    </form>
  )
}

export default AccountInfo
