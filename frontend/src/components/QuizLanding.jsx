import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Navigate, useNavigate } from 'react-router-dom'
import socketClient from "socket.io-client";
import io from "socket.io-client";
import { useSelector } from 'react-redux';
const socket = io.connect("http://localhost:8000");
// const endPoint = "http://localhost:8000";
// const socket = socketClient(endPoint)


const QuizLanding = () => {

    const [lang, setLang] = useState()
    const [room, setRoom] = useState()
const [ques, setQues] = useState()
const [p1, setP1] = useState()
    // const [socket, setSocket] = useState(second)
    const navigate = useNavigate()

    const userId = useSelector(state => state.auth.loggedInUser.id)

    // const joinRoom = () => {

    //     if (room !== "") {
            
    //     }
    // }

    // useEffect(() => {
    //     socket.on("questions", (quesstions) => {
    //         console.log(quesstions);
    //         navigate("/quiz", {state:{questions: quesstions}})
    //     })

    //     console.log("vgftyfyt");

    //     // return ()=>{
    //     //     socket.disconnect()
    //     // }

    // }, [socket])

    
    

    const startQuiz = () => {
        // const socket = socketClient(endPoint)
        socket.emit("start", { room, lang, userId, method:"friend" })


        socket.on("roomDetails", (details)=>{
            console.log(details);
            setQues(details.question)
            setP1( details.p1)
            navigate("/quiz", {state:{questions: details.question, roomDetails: details.room, player1: details.p1, player2: details.p2}})
        })

    }

    const joinRoom = ()=>{
        socket.emit("joinRoom", {room,userId})


        socket.on("roomDetails", (details)=>{
            // console.log(data);
            navigate("/quiz", {state:{ roomDetails: details.room, player2: details.p2, questions: details.question, player1: details.p1}})
        })
    }


    return (
        <>
            <Navbar />
            <div className='flex flex-col md:flex-row items-center md:justify-around'>
                <div className='mt-28'>
                    <div className='md:mx-20 '>
                        <p className=' mx-auto md:mx-20 text-4xl font-bold w-fit  ml-20'>Choose your Language</p>
                        <div className="buttons w-fit md:mx-20 mx-auto mt-5">
                            <button onClick={(event) => setLang(event.target.value)} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" value="HTML">HTML</button>
                            <button onClick={(event) => setLang(event.target.value)} type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" value="CSS">CSS</button>
                            <button onClick={(event) => setLang(event.target.value)} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" value="JavaScript">JS</button>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <p className='mx-auto md:mx-40 text-4xl font-bold w-fit'>Play with </p>
                        <div className='w-fit mx-auto md:mx-40 mt-5'>
                            <input type="text" placeholder='Enter your Room' onChange={(event) => setRoom(event.target.value)} />
                            <button onClick={joinRoom} >join Room</button>
                            {/* <button>Friend</button> */}
                        </div>
                        
                        <button></button>
                    </div>
                    <div className='w-fit mx-auto mt-5 md:mx-40 '>
                        <button onClick={startQuiz} className='bg-yellow-100 hover:text-lg hover:px-20 border border-black text-black font-bold p-4 px-10 rounded-xl'>
                            Start
                        </button>
                    </div>
                </div>
                <div className="div border border-black p-10">
                    <p className='text-center text-4xl font-bold'>Rules:</p>
                    <p className='mt-5 p-1'>
                        <ol className='p-3 list-decimal'>
                            <li>Players can play with a friend or a stranger. </li>
                            <li>The game consists of single round with a set number of questions per round.</li>
                            <li>Questions may be multiple-choice, true/false, or output based.</li>
                            <li>Players must answer within a specified time limit to earn points.</li>
                            <li>The player with the highest score at the end of the final round wins.</li>
                            <li>Have fun and enjoy the friendly competition!</li>
                        </ol>
                    </p>
                </div>
            </div>
        </>
    )
}

export default QuizLanding