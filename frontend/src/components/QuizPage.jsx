import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadQuestionsAsync } from '../../store/reducers/questionReducer'
import QuizQuestion from './QuizQuestion'
import { useLocation } from 'react-router-dom'
import io from "socket.io-client";
const socket = io.connect("http://localhost:8000");

const QuizPage = () => {

  // const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [single, setSingle] = useState()
  // const dispatch = useDispatch()
  // const loadques = useSelector(state => state.questions.questions)

  const location = useLocation()

  // setQuestions()

  const questions = location?.state?.questions
  const p1 = location?.state?.player1
  const p2 = location?.state?.player2
  const roomId = location?.state?.roomDetails?._id
  console.log(p1);
  // useEffect(() => {
  //   setSingle(location?.state?.questions[index])
  // }, [index])

  console.log(questions);

  const increase = () => {
    setTimeout(() => {
      setIndex(index + 1)
    }, 1000);
    console.log(index);
  }
  return (
    <>
      <div className='flex flex-row justify-between'>
        <div className="player bg-red-800 w-full min-h-screen">
          <p className='text-3xl font-extrabold ml-5'>{p1}</p>
          <p className='p-4 font-bold text-white'>Score: 0</p>
        </div>
        <div className="opponent bg-blue-800 w-full min-h-screen">
          <p className='text-3xl font-extrabold ml-5 '>{p2}</p>
          <p className='p-4 font-bold text-white'>Score: 0</p>
        </div>
      </div>

      {
        p1 !== " " && p2 !== "" ?  <div className='question p-5'>
        {
          <div className="md:w-full w-80 mt-20 md:mt-0 mx-auto bg-white shadow-md p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">{single ? single?.question : questions[index]?.question}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {
                questions[index]?.options?.map((option, index) => {
                  return <div key={index} className="flex items-center space-x-2 p-4 bg-gray-100 rounded-lg">
                    <input
                      type="radio"
                      id={`option${index}`}
                      name="quizOption"
                      value={option}
                      className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                      onChange={increase}
                    // checked
                    />
                    <label htmlFor={`option${index}`} className="text-gray-800">{option}</label>
                  </div>
                })}
            </div>
          </div>
        }
      </div> :  <div className='absolute top-60 left-10 w-fit mx-auto bg-white p-5 '>
        <p>Send this room id to your friend</p>
        <p>{roomId}</p>
      </div>
      }

     



      {/* <QuizQuestion question={questions} /> */}


    </>
  )
}

export default QuizPage




