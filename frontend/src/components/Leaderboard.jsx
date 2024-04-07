import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const Leaderboard = () => {

    const [users, setUsers] = useState([])
    const [lang, setLang] = useState("HTML")
    const dispatch = useDispatch()


    useEffect(() => {
        //   const user = axios.get("http://localhost:8000/user/allUser")
        // //   setUsers(user)
        //   console.log(user);

        //   dispatch(findAllUser())

        const users = async () => {
            const allUser = await axios.post("/user/allUser", { lang }) //http://localhost:8000
            console.log(allUser.data.user);
            setUsers(allUser.data.user)
        }
        users()
    }, [lang])


    return (
        <>
            <div className='p-5 flex flex-row justify-evenly'>
                <button onClick={(e) => setLang(e.target.value)} value={"HTML"} className='px-2 p-1 rounded-tr-lg rounded-bl-lg hover:text-white hover:italic border-2 border-blue-300  hover:bg-blue-600 '>HTML</button>
                <button onClick={(e) => setLang(e.target.value)} value={"CSS"} className='px-2 p-1 rounded-tr-lg rounded-bl-lg hover:text-white hover:italic border-2 border-blue-300  hover:bg-blue-600 '>CSS</button>
                <button onClick={(e) => setLang(e.target.value)} value={"JavaScript"} className='px-2 p-1 rounded-tr-lg rounded-bl-lg hover:text-white hover:italic border-2 border-blue-300 ml-4 hover:bg-blue-600 '>JAVASCRIPT</button>
            </div>

            <div className="container mx-auto px-4 py-8">
                <h2 className=" text-2xl font-bold mb-4">Top Scorers in  <span className='font-extrabold text-blue-800 text-3xl'>{lang}</span></h2>
                <div className="grid grid-cols-1  gap-4">
                    {users.map((user, index) => (
                        <div key={index} className="bg-white rounded shadow p-4">
                            <div className="flex justify-between w-full md:w-[50%] mx-auto items-center mb-2">
                                <span className="font-bold">{user.name}</span>

                                <span className="text-gray-600">
                                    {
                                        user.score_history.map((topic) => {
                                            return <div className='flex flex-row space-x-20 items-center'>

                                                <p className='text-lg font-semibold'>
                                                    {
                                                        lang == topic.topic ? topic.topic : " "
                                                    }
                                                </p>
                                                <p>{
                                                    lang == topic.topic ? topic.score : ""
                                                }</p>
                                            </div>
                                        })
                                    }
                                </span>
                            </div>
                            {/* Additional information if needed */}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Leaderboard