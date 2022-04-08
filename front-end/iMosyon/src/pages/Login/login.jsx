import { useEffect } from 'react'
import React from 'react'
import AuthPage from '@/components/auth-user/AuthPage'

export const Login = () => {
  useEffect(() => {
    document.title = 'Login | iMosyon'
    document.getElementsByTagName('body')[0].classList.add('main')
  })

  const left = {
    emoji: ['🌈', '🌈', '🌈'],
    heading: 'Welcome to iMosyon',
    message: 'We are glad to see you here. Please login to continue.',
  }

  const right = {
    title: 'Login',
    message: 'Hello World',
    inputFields: [
      {
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        icon: <i className="fas fa-envelope"></i>,
        ref: React.createRef(),
      },
    ],
  }

  return (
    <>
      <AuthPage left={left} right={right} />
    </>
  )

  // return (
  //   <>
  //     <div className="left">

  //     </div>

  //     <div className="contents">
  //       <div className="left-content">
  //           <div className="circles">
  //             <EmojiCircle emoji="😎" background="linear-gradient(136.81deg, #E18B0A 15.77%, #0ABBE1 108.38%)" />
  //             <EmojiCircle emoji="😆" background="linear-gradient(54.94deg, #690AE1 13.19%, #FF0EBB 134.86%)" />
  //             <EmojiCircle emoji="🤔" background="linear-gradient(70.11deg, #0AE17A 16.53%, #1200DF 109.66%)" />
  //           </div>
  //           <div className="content">
  //             <h1>
  //             iMosyon
  //             </h1>
  //             <p>
  //               “Hello World!”
  //             </p>
  //             <span>
  //               -iMosyon Team
  //             </span>
  //           </div>
  //       </div>
  //       <div className="right-content">
  //         <h2>
  //           Login
  //         </h2>
  //       </div>
  //     </div>
  //   </>
  // )
}

export default Login
