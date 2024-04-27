import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Navbar from './Navbar'
import { motion } from 'framer-motion'
import { RiLoader3Line } from 'react-icons/ri'
const Leaderboard = () => {

    const [users, setUsers] = useState([])
    const [lang, setLang] = useState("HTML")
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const users = async () => {
            const allUser = await axios.post("http://localhost:8000/user/highscores", { lang }) //http://localhost:8000
            setLoading(true)
            console.log(allUser.data.user);
            setUsers(allUser.data.user)
            setLoading(false)
        }
        users()
    }, [lang])


    return (
        <>

            <div className='bg-gradient-to-r h-screen from-violet-600 to-indigo-600'>
                <Navbar />
                <div className='p-5 flex flex-row justify-evenly '>
                    <button onClick={(e) => setLang(e.target.value)} value={"HTML"} className='px-2 p-1 rounded-tr-lg rounded-bl-lg hover:text-white hover:italic font-extrabold border-2 border-blue-300  hover:bg-blue-600 '>HTML</button>
                    <button onClick={(e) => setLang(e.target.value)} value={"CSS"} className='px-2 p-1 rounded-tr-lg rounded-bl-lg hover:text-white hover:italic font-extrabold border-2 border-blue-300  hover:bg-blue-600 '>CSS</button>
                    <button onClick={(e) => setLang(e.target.value)} value={"JavaScript"} className='px-2 p-1 rounded-tr-lg rounded-bl-lg hover:text-white hover:italic font-extrabold border-2 border-blue-300 ml-4 hover:bg-blue-600 '>JAVASCRIPT</button>
                </div>

                <div className="container mx-auto px-4 py-8">
                    <h2 className=" text-2xl font-bold mb-4">Top Scorers in  <span className='font-extrabold text-blue-800 text-3xl'>{lang}</span></h2>

                {
                    loading ? <RiLoader3Line className='animate-spin mt-5 w-96' /> : <div className="grid grid-cols-1 w-fit mx-auto backdrop-blur-md  gap-4">
                    {users.map((user, index) => (
                        <motion.div initial={{ x: -800 }} animate={{ x: 1 }} transition={{ duration: 1, ease: 'easeInOut' }} key={index} className="bg-gradient-to-r from-violet-400 to-blue-500 w-fit rounded shadow p-4">
                            <div className="flex justify-between space-x-10 px-5 md:px-10 w-full md:w-[90%] mx-auto items-center mb-2">
                                <span className="font-bold uppercase">{user.name}</span>

                                <span className="text-gray-600">
                                    {
                                        user.score_history.map((topic) => {
                                            return <div className='flex flex-row space-x-10 items-center'>

                                                <p className='text-lg font-semibold'>
                                                    {
                                                        lang == topic.topic ? topic.topic : " "
                                                    }
                                                </p>
                                                <p className='text-3xl font-bold text-black'>{
                                                    lang == topic.topic ? topic.score : ""
                                                }</p>
                                            </div>
                                        })
                                    }
                                </span>
                            </div>
                            {/* Additional information if needed */}
                        </motion.div>
                    ))}
                </div>
                }

                    
                </div>
            </div>


        </>
    )
}

export default Leaderboard