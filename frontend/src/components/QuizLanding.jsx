import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import io from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import { RiLoader3Line } from "react-icons/ri";
import Cookies from 'js-cookie';
import { motion } from 'framer-motion'
import { checkUserAsync } from '../../store/reducers/authReducer';
// import Cookies from 'js-cookie';
import axios from 'axios';
const socket = io.connect("http://localhost:8000"); //http://localhost:8000

const QuizLanding = () => {

    const [lang, setLang] = useState()
    const [room, setRoom] = useState()
    const [laoding, setlaoding] = useState(false)
    const [show, setShow] = useState(null)

    const navigate = useNavigate()


    const userId = useSelector(state => state.auth.loggedInUser?.id)

    const exitsCookie = Cookies.get("user")

    const dispatch = useDispatch()

    const setCookie = (name, value) => {
        document.cookie = `${name}=${value};path=/`
    }



    const startQuiz = () => {
        console.log(lang);
        if (lang == undefined || lang == " ") {
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
        setLang(" ")
    }

    return (
        <>

            <div className='bg-gradient-to-r from-violet-600 to-indigo-600'>
                <Navbar />

               

                <div className="buttons w-full h-screen  bg-gradient-to-r from-violet-600 to-indigo-600 min-h-full ">
                    {
                        show == null ? <div className='question flex flex-col md:flex-row xl:flex-row 2xl:flex-row md:space-x-5 mt-10 md:mt-0'>

                            <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1, ease: 'easeInOut' }} className='bg-yellow-100 hover:bg-lime-200 border border-black text-black font-bold p-4 px-10 rounded-xl mt-2' onClick={() => setShow(true)}>
                                Create room
                            </motion.button>

                            <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1, ease: 'easeInOut' }} className='bg-yellow-100 hover:bg-lime-200 border border-black text-black font-bold p-4 px-10 rounded-xl mt-2' onClick={() => setShow(false)}>
                                Join room
                            </motion.button>

                        </div> : ""
                    }


                    {
                        show ? <div className='flex flex-col mt-20 items-center question'>
                            <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1, ease: 'easeInOut' }} className='font-extrabold text-xl'>Select your Language</motion.p>
                            <motion.div initial={{ x: -200 }} animate={{ x: 1 }} transition={{ duration: 1, ease: 'easeIn' }} className="buttons w-fit md:mx-20 flex flex-row mx-auto mt-5">
                                <button onClick={(event) => setLang(event.target.value)} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" value="HTML">HTML</button>
                                <button onClick={(event) => setLang(event.target.value)} type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" value="CSS">CSS</button>
                                <button onClick={(event) => setLang(event.target.value)} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" value="JavaScript">JS</button>
                            </motion.div>
                            <div className='w-fit mx-auto mt-2 md:mx-40 '>
                                <motion.button initial={{ x: -200 }} animate={{ x: 1 }} transition={{ duration: 1, ease: 'easeInOut' }} onClick={startQuiz} className='bg-yellow-100 hover:bg-lime-200 border border-black text-black font-bold p-4 px-10 rounded-xl mt-2'>
                                    {laoding && room == undefined ? < RiLoader3Line className='animate-spin' /> : "Create Room"}
                                </motion.button>
                            </div>
                            <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1, ease: 'easeInOut' }} className='mt-5 font-extrabold text-white text-2xl' onClick={() => setShow(false)}> or Join One</motion.button>
                        </div> : (show == null ? "" :
                            <div className='question flex flex-col items-center'>

                                <motion.div initial={{ x: -200 }} animate={{ x: 1 }} transition={{ duration: 1, ease: 'easeInOut' }} className='w-fit  mx-auto md:mx-40 mt-5 flex flex-col md:flex-row md:space-x-6 items-center indent-5'>
                                    <input className='px-4 h-12 my-2 border rounded-lg border-1 border-gray-300 outline-blue-500' type="text" placeholder='Enter your Room' onChange={(event) => setRoom(event.target.value)} />
                                    <motion.button initial={{ x: -200 }} animate={{ x: 1 }} transition={{ duration: 1, ease: 'easeInOut' }} className='border font-bold border-black hover:bg-white border-2 p-2 rounded-2xl' onClick={joinRoom} >
                                        {laoding && room != undefined ? < RiLoader3Line className='animate-spin' /> : "Join Room"}
                                    </motion.button>
                                </motion.div>

                                <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1, ease: 'easeInOut' }} className='mt-5 font-extrabold text-white text-2xl' onClick={() => setShow(true)}> or Create One</motion.button>
                            </div>)
                    }

                </div>
            </div>








        </>
    )
}

export default QuizLanding