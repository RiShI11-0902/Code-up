import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadQuestionsAsync } from '../../store/reducers/questionReducer'
import QuizQuestion from './QuizQuestion'
import { useLocation, useNavigate } from 'react-router-dom'
import io from "socket.io-client";
import { CopyToClipboard } from "react-copy-to-clipboard"
// const socket = io.connect("http://localhost:8000");
const socket = io.connect("http://localhost:8000");

const QuizPage = () => {

  // const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [gameOver, setgameOver] = useState(false)
  const [roomCopy, setRoomCopy] = useState()
  const [copyStatus, setCopyStatus] = useState(false)
  const [player_1, setPlayer_1] = useState(0)
  const [player_2, setPlayer_2] = useState(0)


  const navigate = useNavigate()


  // const dispatch = useDispatch()
  // const loadques = useSelector(state => state.questions.questions)
  const selectUser = useSelector(state => state.auth.loggedInUser)

  const location = useLocation()

  // setQuestions()

  const questions = location?.state?.questions
  const p1 = location?.state?.player1
  const p2 = location?.state?.player2
  const roomId = location?.state?.roomDetails?._id
  const lang = location?.state?.lang
  console.log(p2._id);
  console.log(p1._id);
  console.log(lang);
  // console.log(questions);
  // useEffect(() => {
  //   setSingle(location?.state?.questions[index])
  // }, [index])

  // console.log(questions.length);

  useEffect(() => {
    socket.on("correct_ans", (data) => {
      // data.correct && data.userId == selectUser.id  ?  setScore(data.score_p1) : "" 
      // setScore(data.score)
      console.log(data);
      setPlayer_1(data.p1)
      setPlayer_2(data.p2)
      // setIndex(index + 1)
      // p1.id == selectUser._id || p2.id == selectUser._id ? setIndex(index + 1) : " "
    })
    setRoomCopy(roomId)
    socket.on("gameOver", ()=>{
      setgameOver(true)
    })
  }, [player_1, player_2,gameOver])


  const increase = (q_id, ind, index) => {
    // setTimeout(() => {
    //   setIndex(index + 1)
    // }, 1000);
    // console.log(index);

    console.log(questions.length);
    console.log(index);

    if (index >= questions.length - 1) {
      // setgameOver(true)
      socket.emit("endGame", {roomId})
      // alert("Over")
      // console.log("Over brooooooo");

      socket.on("gameOver", ()=>{
        setgameOver(true)
      })

    }

    if (questions[index].correctOptionIndex == ind) {
      // console.log("correct by " + selectUser.id);
      // selectUser.id == p1._id ? setPlayer_1(player_1+1) : setPlayer_2(player_2+1)
      // console.log(player_1 + " " + player_2);
      // socket.emit("update", {userId: selectUser.id, roomId, player_1,player_2})
      // setIndex(index+1)
      socket.emit("check_ans", { userId: selectUser.id, roomId, correct: true })
      console.log(index);
      setIndex(index + 1)
    } else {
      socket.emit("check_ans", {userId: selectUser.id, roomId, correct: false})
      setIndex(index + 1)
    }

    // socket.emit("check_ans", {q_id,ind,userId: selectUser.id,roomId})
    console.log(p1.current_score);

    // socket.on("check_ans",(data)=>{
    //   console.log(data);
    // })

    // socket.on("correct_ans", (data)=>{
    //   // data.correct && data.userId == selectUser.id  ?  setScore(data.score_p1) : "" 
    //   // setScore(data.score)
    //   console.log(data);

    //   setPlayer_1(data.p1)
    //   setPlayer_2(data.p2)
    //   setIndex(index+1)
    // })



  }

  const copyText = () => {
    setCopyStatus(true)
    console.log(roomCopy);
    setTimeout(() => {
      setCopyStatus(false)
    }, 2000);
  }

  const closeGame = ()=>{
    socket.emit("closeGame", {roomId,player_1,player_2,lang,user: selectUser.id})
    navigate("/quiz-homepage")
  }
  return (
    <>
      <div className='flex flex-row justify-between'>
        <div className="player bg-red-800 w-full min-h-screen">
          <p className='text-3xl font-extrabold ml-5'>{p1.id == selectUser.id ? "You" : p1.name}</p>
          <p className='p-4 font-bold text-white'>Score: {player_1}</p>
          {/* {score} */}
        </div>
        <div className="opponent bg-blue-800 w-full min-h-screen">
          <p className='text-3xl font-extrabold ml-5 '>{p2.id == selectUser.id ? "You" : p2.name}</p>
          <p className='p-4 font-bold text-white'>Score: {player_2}</p>
          {/* {score} */}
        </div>
      </div>

      {
        p1 !== " " && p2 !== "" && gameOver == false ? <div className='question p-1'>
          {
            <div className="md:w-full w-80 mt-20 md:mt-0 mx-auto bg-white shadow-md p-8 rounded-lg">
              {gameOver == true ? "Game Over" : " "}
              <h2 className="text-xl font-semibold mb-4">{ index > questions.length - 1 ? "Result Pending": questions[index]?.question}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {
                  questions[index]?.options?.map((option, ind) => {
                    return <div className="flex items-center space-x-2 p-4 bg-gray-100 rounded-lg">
                      <input
                        type="radio"
                        id={`option${index}`}
                        name="quizOption"
                        value={option}
                        className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                        onClick={() => increase(questions[index]._id, ind, index)}
                      // checked
                      />
                      <label htmlFor={`option${index}`} className="text-gray-800">{option}</label>
                    </div>
                  })
                }
              </div>
            </div>
          }
        </div> : <div className=' question md:w-[30rem] h-52 mx-auto rounded-3xl bg-white p-5 '>
          {gameOver ?
            <div className='font-bold text-xl md:text-3xl'>
              <div className="box text-center">
                {
                  player_1 > player_2 ? <div>{p1.name} Won the Match with <p className='text-2xl text-green-800 font-extrabold'>{player_1} </p> Score </div> : (player_2 > player_1 ? <div>{p2.name} Won the Match with <span className='text-2xl text-green-800 font-extrabold'>{player_2} </span> Score</div> : (player_1 == player_2 ? <div className='text-lg text-green-950 font-extrabold'> Match Is Drawn </div> : null))
                }
              </div>
              <button className='mt-5 relative left-[30%] md:left-[45%] text-lg w-fit  rounded-3xl border border-2 border-black px-2' onClick={closeGame}>
                Close
              </button>
            </div>
            : <div  className='bg-white p-4 question '>
              <p className='font-semibold'>Send this room id to your friend</p>
              <p className='text-xl font-bold' onChange={(e) => setRoomCopy(e.target.value)} >{roomId}</p>
              <CopyToClipboard text={roomCopy} onCopy={copyText} >
                <button className='border-2 border border-black p-2 rounded-lg mt-3'>Copy</button>
              </CopyToClipboard>
              <p className='text-green-500 font-bold'>{copyStatus ? "Room id copied !!! " : " "}</p>
            </div>}

        </div>
      }




      {/* {
          : " "  questions.length > index ? : <div className=''><p className='font-extrabold text-black'>"Game Over.........
                  {
                    player_1 > player_2 ? <div>{p1.name} is Winner</div> : <div>{p2.name} is Winner</div> || player_1 == player_2 ? <div>{p1.name} and {p2.name} both are Winner</div> : " "
                  }
                  </p></div>
      } */}





      {/* <QuizQuestion question={questions} /> */}


    </>
  )
}

export default QuizPage




