import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from './components/Homepage'
import Login from './components/Login'
import Register from './components/Register'
import QuizLanding from './components/QuizLanding'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/quizpage' element={< QuizLanding />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
