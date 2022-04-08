import { useEffect } from "react";

import './login.css'

export const Login = () => {
  useEffect(() => {
    document.title = "Login | iMosyon";
    document.getElementsByTagName("body")[0].classList.add("main")
  })

  return (
    <>
      <div className="left">

      </div>
    </>
  )
}

export default Login
