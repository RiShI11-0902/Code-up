import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from './components/Homepage'
import Login from './components/Login'
import Register from './components/Register'
import QuizLanding from './components/QuizLanding'
import Protected from './components/Protected'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkUserAsync } from '../store/reducers/authReducer'
import QuizPage from './components/QuizPage'
import Leaderboard from './components/Leaderboard'
import About from './components/About'
import axios from 'axios'

function App() {

  const dispatch = useDispatch()


  let user = useSelector(state => state.auth.loggedInUser?.id)

// const [exitsUser, setExitsUser] = useState()
  // useEffect(() => {
  //   dispatch(checkUserAsync())
  // }, [dispatch])

  useEffect(() => {
    const exits = localStorage.getItem('user')

    if (exits) {
     
       dispatch(checkUserAsync(exits))
     
    }
  }, [dispatch])

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/quiz-homepage' element={<Protected><QuizLanding /></Protected>} />
          <Route path='/quiz' element={<Protected><QuizPage /></Protected>} />
          <Route path='/leaderboard' element={<Leaderboard />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
