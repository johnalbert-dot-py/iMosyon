import { React, useContext } from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'

import { UserAuthContext } from '../../context/UserAuth'

const DasboardNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 150px;
  width: 100%;
  gap: 10px;
`

export const Navbar = ({ children }) => {
  const [isUserAuth, setUserAuth] = useContext(UserAuthContext)

  const logout = () => {
    setUserAuth({ ...isUserAuth, logged_in: false })
    Cookies.remove('csrf_access_token')
    Cookies.remove('access_token')
  }

  return (
    <DasboardNav>
      {children}
      <button
        className="rounded-md text-primary-white bg-primary-blue px-6 py-3 hover:bg-opacity-80"
        onClick={logout}
      >
        Log Out
      </button>
    </DasboardNav>
  )
}

export default Navbar
