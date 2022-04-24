import { React } from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserAuthProvider } from './context/UserAuth'

import Home from '@/pages/Home/home'
import SignUp from '@/pages/SignUp/sign-up'
import Login from '@/pages/Login/login'
import Dashboard from '@/pages/Dashboard/Dashboard'
import PredictionResult from '@/pages/Dashboard/PredictionResult'

import LoginRequired from '@/components/LoginRequired'

const App = () => {
  return (
    <UserAuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register/" element={<SignUp />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/user/dashboard/">
          <Route
            path=""
            element={
              <LoginRequired>
                <Dashboard />
              </LoginRequired>
            }
          ></Route>
          <Route
            path="prediction-result/:id"
            element={
              <LoginRequired>
                <PredictionResult />
              </LoginRequired>
            }
          />
        </Route>
        {/* <Route element={<div>{(window.location.href = '/')}</div>} /> */}
      </Routes>
    </UserAuthProvider>
  )
}

export default App
