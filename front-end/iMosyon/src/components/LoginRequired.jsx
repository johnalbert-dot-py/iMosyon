import { React, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuthContext } from '@/context/UserAuth'

export const LoginRequired = ({ children }) => {
  const [userAuth, setUserAuth] = useContext(UserAuthContext)
  if (userAuth.logged_in) {
    return children
  }
  return <Navigate to="/login" replace />
}

export default LoginRequired
