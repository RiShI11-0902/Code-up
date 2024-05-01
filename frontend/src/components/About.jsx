import React, { useState } from 'react'
import Navbar from './Navbar'
import { pic1 } from '../assets'
import { FaGithub } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import {motion} from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component'
const About = () => {

  const [down, setDown] = useState(false)

  return (
    <>

      <div className='bg-gradient-to-r   from-violet-600 to-indigo-600 h-screen'>

        <div className=' block md:hidden '  onClick={() => setDown(!down)} > 
          <Navbar /> 
        </div>

        <div className='hidden sm:hidden md:block  '   > 
          <Navbar /> 
        </div>
        

        <div className={`relative   `}>
          <div className='w-fit mx-auto xl:mx-20'>

            {/* <LazyLoadImage effect='blur' src={pic1} className='w-80 rounded-2xl md:w-[40rem]' placeholder={'name'} /> */}
            
            <motion.img initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1, ease: 'easeInOut' }} className={`w-80 rounded-2xl md:w-[40rem] ${down ? 'opacity-0' : ""}`} src={pic1} alt="" />
          </div>
          <p className={`font-bold text-5xl text-white uppercase -mt-5 absolute top-52 left-10 md:top-[26rem] md:left-40 md:text-7xl xl:top-28 2xl:top-16 xl:left-[40rem] xl:text-6xl tracking-widest`}>About Us</p>
          <div className={`flex flex-col items-center  p-9 mx-auto w-fit  right-0 top-[15rem] md:w-[80%] md:top-[30rem] xl:w-[40%] 2xl:w-[47%] absolute md:right-20 xl:top-24 text-lg text-black  ${down ? 'bg-gradient-to-r  from-violet-600 to-indigo-600' : ""} `}>
            
            <motion.p initial={{ y: -800 }} animate={{ y: 1 }} transition={{ duration: 1, ease: 'easeInOut' }} className={`  md:text-4xl xl:text-3xl 2xl:text-3xl  `}>
            We're dedicated to revolutionizing the way you learn and have fun. Our app offers a unique blend of education and entertainment, providing an engaging platform for players of all ages to expand their knowledge while competing with friends and fellow enthusiasts.
            </motion.p>
            <div className={`  mt-5  flex flex-col items-center`}>
              <p className={`  text-black text-xl font-bold `}>Contact us on</p>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1, ease: 'easeInOut' }} className='flex flex-row mt-3 rounded-2xl w-fit space-x-5 mx-auto p-5 bg-white'>
                <div> <a className='hover:text-blue-600' target='_blank' href="https://github.com/RiShI11-0902"><FaGithub /></a> </div>
                <div> <a className='hover:text-blue-600' target='_blank' href="https://www.instagram.com/rishi_codes/"><FaInstagram/></a> </div>
                <div> <a className='hover:text-blue-600' target='_blank' href="https://www.linkedin.com/in/rushikesh-bagade11"><FaLinkedin/></a> </div>
              </motion.div>
            </div>
          </div>


        </div>
      </div>

    </>
  )
}

export default About