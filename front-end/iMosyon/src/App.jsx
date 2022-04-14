import { React } from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserAuthProvider } from './context/UserAuth'

import Home from '@/pages/Home/home'
import SignUp from '@/pages/SignUp/sign-up'
import Login from '@/pages/Login/login'

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <UserAuthProvider>
            <Home />
          </UserAuthProvider>
        }
      />
      <Route path="/register/" element={<SignUp />} />
      <Route
        path="/login/"
        element={
          <UserAuthProvider>
            <Login />{' '}
          </UserAuthProvider>
        }
      />
    </Routes>
  )
}

export default App
