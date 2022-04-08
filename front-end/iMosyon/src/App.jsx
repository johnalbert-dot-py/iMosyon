import Home from '@/pages/Home/home';
import SignUp from '@/pages/SignUp/sign-up'
import Login from '@/pages/Login/login'
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register/" element={<SignUp />} />
      <Route path="/login/" element={<Login />} />
    </Routes>
  )
}

export default App;
