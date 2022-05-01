import { React, useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

export const PasswordSettings = (props) => {
  const [oldPasswordError, setOldPasswordError] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setOldPasswordError('')
    setLoading(false)
  }, [oldPassword])

  const updatePassword = (e) => {
    e.preventDefault()
    setLoading(true)
    axios({
      url: '/api/user/update-password',
      method: 'PUT',
      withCredentials: true,
      data: {
        'old-password': oldPassword,
        'new-password': newPassword,
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
        let res = error.response.data
        if (res.error) {
          res.error.forEach((err) => {
            if (err.field === 'old-password') {
              setOldPasswordError(err.message)
            } else {
              console.log(err)
            }
          })
        } else {
          props.notify({ message: 'Error while making request.', error: true })
        }
      })
  }

  return (
    <form className="h-full" onSubmit={updatePassword}>
      <div className="flex flex-col gap-5 justify-center pt-6">
        <div className="flex flex-row align-middle items-baseline gap-3">
          <div className="flex flex-col text-primary-white font-sans lg:w-3/4">
            <label
              htmlFor="old-password"
              className="text-md font-semibold mb-1"
            >
              Old Password
            </label>
            <input
              type="password"
              id="old-password"
              name="old-password"
              placeholder="Enter Old Password"
              onChange={(e) => {
                setOldPassword(e.target.value)
              }}
              required
              className={`text-primary-white border-none rounded-lg px-6 py-4 bg-[#222324] ${
                oldPasswordError != ''
                  ? 'outline outline-1 outline-danger text-danger'
                  : 'text-primary-white outline-none'
              }`}
            />
            <span
              className={`text-danger font-primary font-light text-sm ml-1 ${
                oldPasswordError ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {oldPasswordError}
            </span>
          </div>
          <div className="flex flex-col text-primary-white font-sans lg:w-3/4">
            <label
              htmlFor="new-password"
              className="text-md font-semibold mb-1"
            >
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              name="new-password"
              onChange={(e) => {
                setNewPassword(e.target.value)
              }}
              required
              className="text-primary-white border-none rounded-lg px-6 py-4 outline-none bg-[#222324]"
              placeholder="Enter New Password"
            />
          </div>
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

export default PasswordSettings
