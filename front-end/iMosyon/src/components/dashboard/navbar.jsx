import { React } from 'react'
import styled from 'styled-components'

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
  return <DasboardNav>{children}</DasboardNav>
}

export default Navbar
