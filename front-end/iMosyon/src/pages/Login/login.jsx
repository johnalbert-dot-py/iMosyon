import { useEffect } from "react";
import EmojiCircle from '@/components/EmojiCircle';

import './login.scss'

export const Login = () => {
  useEffect(() => {
    document.title = "Login | iMosyon";
    document.getElementsByTagName("body")[0].classList.add("main")
  })

  return (
    <>
      <div className="left">

      </div>

      <div className="contents">
        <div className="left-content">
            <div className="circles">
              <EmojiCircle emoji="😎" background="linear-gradient(136.81deg, #E18B0A 15.77%, #0ABBE1 108.38%)" />
              <EmojiCircle emoji="😆" background="linear-gradient(54.94deg, #690AE1 13.19%, #FF0EBB 134.86%)" />
              <EmojiCircle emoji="🤔" background="linear-gradient(70.11deg, #0AE17A 16.53%, #1200DF 109.66%)" />
            </div>
            <div className="content">
              <h1>
              iMosyon
              </h1>
              <p>
                “Hello World!”
              </p>
              <span>
                -iMosyon Team
              </span>
            </div>
        </div>
        <div className="right">
          <h2>
            Login
          </h2>
        </div>
      </div>
    </>
  )
}

export default Login
