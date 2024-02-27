import React, { useEffect, useRef } from 'react';
import { img } from '../assets';
import Typed from "typed.js"
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login';

const HomePage = () => {

    const Typingref = useRef(null)

    const navigate = useNavigate()

    useEffect(() => {
        const options = {
            strings: [
                "HTML",
                "CSS",
                "JAVASCRIPT",
                "JAVA"
            ],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 1000,
            loop: true,
            backCursor: true
        }

        const typingInstance = new Typed(Typingref.current, options)

        return () => {
            typingInstance.destroy()
        }
    }, [])

    const show = () => {
        console.log("jndj")
    }


    return (
        <>
            <div className='flex flex-col  md:w-full    md:flex-row '>
                <p className='absolute text-white top-5 left-10 text-3xl font-extrabold'>
                    <div className="logo    text-4xl font-bold ">
                        code<sup className="text-sm">Up</sup>.
                    </div>
                </p>
                <div className='  bg-blue-950  min-h-screen  md:w-[60%] '>

                    <div className=' mt-10 p-10 md:p-0 md:mt-60 md:ml-20'>
                        <h1 className="text-2xl md:text-4xl font-bold text-left mb-4 text-white">Welcome to the Quiz App!</h1>
                        <p className=" mb-4 text-white text-left md:w-[40rem] md:text-xl font-semibold">"Discover, compete, and connect with our Quiz App! Explore fascinating questions, challenge your friends, and enjoy endless fun while learning together!"</p>
                        <div className='mt-5 font-medium text-left text-white text-lg'>
                            Test your Knowledge in... <br /> <span className='font-bold text-white text-2xl' ref={Typingref}></span>
                        </div>
                    </div>
                </div>
                <div className=' md:bg-blue-400 -mt-40 md:mt-0 ml-10 md:ml-0 md:w-[40%] md:p-36 '>
                    <Login />
                    {/* <ul className='flex flex-row space-x-10 md:mt-32'>
                        <li className='font-extrabold text-lg bg-red-300 rounded-lg p-3'><Link to={'/login'} >Login</Link></li>
                        <li className='font-extrabold text-lg bg-red-300 rounded-lg p-3'><Link to={'/register'} >register</Link></li>
                    </ul> */}
                </div>
            </div>

        </>



    );
};
///  before:p-10  md:before:skew-y-6 before:skew-y-2 
export default HomePage;
