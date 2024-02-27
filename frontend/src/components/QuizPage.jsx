import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadQuestionsAsync } from '../../store/reducers/questionReducer'
import QuizQuestion from './QuizQuestion'

const QuizPage = () => {

  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(4)
  const [single, setSingle] = useState()
  const dispatch = useDispatch()
  const loadques = useSelector(state => state.questions.questions)

  useEffect(() => {
    dispatch(loadQuestionsAsync())
    setQuestions(loadques?.question)
    setSingle(questions[index])
  }, [index])

  // useEffect(() => {
  //   setSingle(questions[index])
  // }, [index])
  

  


  console.log(loadques.question[0]);
console.log(single);
  return (
    <>

      <div className='flex flex-row justify-between'>
        <div className="player bg-red-800 w-full min-h-screen">
          <p className='text-3xl font-extrabold ml-5'>You</p>
          <p className='p-4 font-bold text-white'>Score: 0</p>
        </div>
        <div className="opponent bg-blue-800 w-full min-h-screen">
          <p className='text-3xl font-extrabold ml-5 '>Opponent</p>
          <p className='p-4 font-bold text-white'>Score: 0</p>
        </div>
      </div>

      <div className='question p-5'>
        {
          <div className="md:max-w-md w-80 mt-20 md:mt-0 mx-auto bg-white shadow-md p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">{ single ?  single?.question : questions[0]?.question}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              { single ? single?.options?.map((option, index) => {
                return <div key={index} className="flex items-center space-x-2 p-4 bg-gray-100 rounded-lg">
                  <input
                    type="radio"
                    id={`option${index}`}
                    name="quizOption"
                    value={option}
                    className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                    onClick={()=> setIndex(index+1)}
                  />
                  <label htmlFor={`option${index}`} className="text-gray-800">{option}</label>
                </div>
              }) :  questions[0]?.options?.map((option,index)=>{
                return <div key={index} className="flex items-center space-x-2 p-4 bg-gray-100 rounded-lg">
                  <input
                    type="radio"
                    id={`option${index}`}
                    name="quizOption"
                    value={option}
                    className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                    onClick={()=> setIndex(index+1)}
                  />
                  <label htmlFor={`option${index}`} className="text-gray-800">{option}</label>
                </div>
              })}
            </div>
          </div>

        }
      </div>

      {/* <QuizQuestion question={questions} /> */}


    </>
  )
}

export default QuizPage