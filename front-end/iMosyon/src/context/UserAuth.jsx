import { React, createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'

export const UserAuthContext = createContext({})

export const UserAuthProvider = (props) => {
  // const dateToday = new Date().toLocaleString('en-PH')
  const path = window.location.pathname
  const [userAuth, setUserAuth] = useState({
    logged_in: Cookies.get('csrf_access_token') ? true : false,
    expired_on: null,
  })

  useEffect(() => {
    if (path.includes('/user')) {
      console.log('Checking for Token Validity')
    } else {
      console.log("You're not on the user page")
    }
  })

  return (
    <UserAuthContext.Provider value={[userAuth, setUserAuth]}>
      {props.children}
    </UserAuthContext.Provider>
  )
}

export default UserAuthProvider
