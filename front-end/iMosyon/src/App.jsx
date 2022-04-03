import Home from '@/pages/Home/home';
import SignUp from '@/pages/SignUp/sign-up'
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-up/" element={<SignUp />} />
    </Routes>
  )
}

export default App;
