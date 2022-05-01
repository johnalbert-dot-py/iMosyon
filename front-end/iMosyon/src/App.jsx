import { React } from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserAuthProvider } from './context/UserAuth'

import Home from '@/pages/Home/home'
import SignUp from '@/pages/SignUp/sign-up'
import Login from '@/pages/Login/login'
import Dashboard from '@/pages/Dashboard/Dashboard'
import PredictionResult from '@/pages/Dashboard/PredictionResult'
import Setting from '@/pages/Dashboard/Settings'
import Profile from '@/pages/Dashboard/Profile'

import LoginRequired from '@/components/LoginRequired'

const App = () => {
  return (
    <UserAuthProvider>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register/" element={<SignUp />} />
        <Route exact path="/login/" element={<Login />} />
        <Route exact path="/user/dashboard/">
          <Route
            path=""
            exact
            element={
              <LoginRequired>
                <Dashboard />
              </LoginRequired>
            }
          ></Route>
          <Route
            path="prediction-result/:id"
            exact
            element={
              <LoginRequired>
                <PredictionResult />
              </LoginRequired>
            }
          />
          <Route
            exact
            path="settings/"
            element={
              <LoginRequired>
                <Setting />
              </LoginRequired>
            }
          />
          <Route
            exact
            path="profile/"
            element={
              <LoginRequired>
                <Profile />
              </LoginRequired>
            }
          />
        </Route>
        <Route path="*" element={<h2>Page not Found</h2>} />
      </Routes>
    </UserAuthProvider>
  )
}

export default App
