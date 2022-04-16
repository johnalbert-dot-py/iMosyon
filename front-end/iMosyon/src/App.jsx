import { React } from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserAuthProvider } from './context/UserAuth'

import Home from '@/pages/Home/home'
import SignUp from '@/pages/SignUp/sign-up'
import Login from '@/pages/Login/login'
import Dashboard from '@/pages/Dashboard/Dashboard'
import LoginRequired from '@/components/LoginRequired'

const App = () => {
  return (
    <UserAuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register/" element={<SignUp />} />
        <Route path="/login/" element={<Login />} />
        <Route
          path="/user/dashboard"
          element={
            <LoginRequired>
              <Dashboard />
            </LoginRequired>
          }
        />
      </Routes>
    </UserAuthProvider>
  )
}

export default App
