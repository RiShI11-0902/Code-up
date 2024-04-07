import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Navigate, useNavigate } from 'react-router-dom'
import socketClient from "socket.io-client";
import io from "socket.io-client";
import { useSelector } from 'react-redux';
import { RiLoader3Line } from "react-icons/ri";

const socket = io.connect("http://localhost:8000");



const QuizLanding = () => {

    const [lang, setLang] = useState()
    const [room, setRoom] = useState()
    const [laoding, setlaoding] = useState(false)

    const navigate = useNavigate()

    const userId = useSelector(state => state.auth.loggedInUser.id)

    const startQuiz = () => {
        console.log(lang);
        if (lang == undefined) {
            alert("Please select any one language")
        } else if (room != undefined) {
            alert("Please Join the room u have entered")
        } else {
            setlaoding(true)
            socket.emit("start", { room, lang, userId, method: "friend" })
            socket.on("roomDetails", (details) => {
                console.log(details);
                navigate("/quiz", { state: { questions: details.question, roomDetails: details.room, player1: details.p1, player2: details.p2, lang: lang } })
            })
        }
        setLang(" ")
    }

    const joinRoom = () => {

        console.log(room);

        if (room == undefined) {
            alert("Please Enter Room")
        } else {
            setlaoding(true)
            socket.emit("joinRoom", { room, userId })
            socket.on("roomDetails", (details) => {
                console.log(details);
                navigate("/quiz", { state: { roomDetails: details.room, player2: details.p2, questions: details.question, player1: details.p1, lang: lang } })
            })
        }

        // console.log("Room is empty");
        // alert("please enter a room first")
        setLang(" ")
    }




    return (
        <>
            <Navbar />
            <div className='flex flex-col space-y-5 md:space-y-0 md:flex-row items-center md:justify-around md:mt-28'>
                <div className='mt-8 md:mt-0'>
                    <div className='md:mx-20 '>
                        <p className=' mx-auto md:mx-20 text-4xl font-bold w-fit  ml-20'>Choose your Language</p>
                        <div className="buttons w-fit md:mx-20 mx-auto mt-5">
                            <button onClick={(event) => setLang(event.target.value)} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" value="HTML">HTML</button>
                            <button onClick={(event) => setLang(event.target.value)} type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" value="CSS">CSS</button>
                            <button onClick={(event) => setLang(event.target.value)} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" value="JavaScript">JS</button>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <p className='mx-auto md:mx-40 md:text-4xl text-xl font-bold w-fit'>Join a Room or Create One </p>
                        <div className='w-fit mx-auto md:mx-40 mt-5 flex flex-col md:flex-row md:space-x-6 items-center indent-5'>
                            <input className='px-4 h-12 my-2 border rounded-lg border-1 border-gray-300 outline-blue-500' type="text" placeholder='Enter your Room' onChange={(event) => setRoom(event.target.value)} />
                            <button className='border font-bold border-black border-2 p-2 rounded-2xl' onClick={joinRoom} >
                                {laoding && room != undefined ? < RiLoader3Line className='animate-spin' /> : "Join Room"}
                            </button>
                        </div>
                        <button></button>
                    </div>
                    <div className='w-fit mx-auto mt-2 md:mx-40 '>
                        <p className='font-semibold text-black'>Don't have a room create one Now!! </p>
                        <button onClick={startQuiz} className='bg-yellow-100 hover:bg-lime-200 border border-black text-black font-bold p-4 px-10 rounded-xl mt-2'>
                            {laoding && room == undefined ? < RiLoader3Line className='animate-spin' /> : "Start"}
                        </button>
                    </div>
                </div>
                <div className="div border md:w-[28rem] shadow-lg rounded-2xl shadow-black border-slate-100 p-10">
                    <p className='text-center text-4xl font-bold'>Rules:</p>
                    <p className='mt-5 p-1'>
                        <ol className='p-3 list-decimal'>
                            <li>Players can play with a friend. </li>
                            <li>The game consists of single round with a set number of questions per round.</li>
                            <li>Questions may be multiple-choice, true/false, or output based.</li>
                            <li>Players must answer correctly to earn points.</li>
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