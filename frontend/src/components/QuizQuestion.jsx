import React, { useState } from 'react'

const QuizQuestion = ({ question }) => {
    const [index, setIndex] = useState(0)
    const currentQ = question[index]
    console.log(currentQ);
    console.log(question);
    return (
        <div>
            <div className='question p-5'>


                {/* <div className="max-w-md mx-auto bg-white shadow-md p-8 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4"> {currentQ.question}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentQ.options?.map((option, index) => {
                            return <div key={index} className="flex items-center space-x-2 p-4 bg-gray-100 rounded-lg">
                                <input
                                    type="radio"
                                    id={`option${index}`}
                                    name="quizOption"
                                    value={option}
                                    className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                />
                                <label htmlFor={`option${index}`} className="text-gray-800">{option}</label>
                            </div>
                        })}
                    </div>
                </div> */}

            </div>
        </div>
    )
}

export default QuizQuestion