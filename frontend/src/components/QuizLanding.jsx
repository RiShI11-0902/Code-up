import React, { useState } from 'react'
import Navbar from './Navbar'

const QuizLanding = () => {

    const [lang, setLang] = useState()
    const [method, setMethod] = useState()

    const startQuiz = ()=>{
        console.log(lang);
        console.log(method);
    }

    return (
        <>
        <Navbar />
            <div>
                <div className='mt-28'>
                    <p className='mx-auto text-2xl font-bold w-fit'>Choose your Language</p>
                    <div className="buttons w-fit mx-auto mt-5">
                        <button onClick={(event) => setLang(event.target.value)} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" value="html">HTML</button>
                        <button onClick={(event) => setLang(event.target.value)} type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" value="css">CSS</button>
                        <button onClick={(event) => setLang(event.target.value)} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" value="js">JS</button>
                    </div>
                    <div className='w-fit mx-auto mt-5'>
                        <p className='mx-auto text-2xl font-bold w-fit'>Play with </p>
                        <button type="button" className="text-white mt-5 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={(event)=> setMethod(event.target.value)} value="friend">Friend</button>
                        <button type="button" className="text-white mt-5 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={(event)=> setMethod(event.target.value)} value="stranger">Stranger</button>
                    </div>
                    <div className='w-fit mx-auto mt-5'>
                        <button onClick={startQuiz} className='bg-gray-700 text-white p-4 rounded-xl'>
                            Start
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuizLanding