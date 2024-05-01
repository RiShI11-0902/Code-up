import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { createUserAsync, loginUserAsync } from '../../store/reducers/authReducer'
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from 'react-router-dom'
import { RiLoader3Line } from "react-icons/ri";
import { useEffect } from 'react'
import Cookies from 'js-cookie';


const Login = () => {
  const [flag, setFlag] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const selectUser = useSelector(state => state.auth.loggedInUser)
  const err = useSelector(state => state.auth.error)
  // console.log(selectUser);

  const [error, setError] = useState(null)

  // if (selectUser) {
  //   Cookies.set("user", selectUser?.id)
  // }

  useEffect(() => {
    setError(false)
  }, [err])

  // useEffect(() => {
  //   if (exitsCookie == undefined || !exitsCookie ) {

  //   }
  // }, [])





  return (
    <>
      {selectUser && <Navigate to={"/quiz-homepage"} replace={true} ></Navigate>}
      <div>
        <section className="-mt-36 sm:mt-0 lg:-mt-20 -ml-10 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold md:text-gray-900 text-white">
              {flag ? "Register Now" : " Login your account"}
            </a>
            <div className="xl:w-[70rem] md:w-[90%] bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                {
                  flag ? <form onSubmit={handleSubmit((data) => {
                    setLoading(true)
                    console.log(loading);
                    if (data) {
                      dispatch(createUserAsync({
                        username: data.username,
                        name: data.name,
                        password: data.password
                      })).then(() => {
                        setLoading(false); // Reset loading state after dispatch completes
                      }).catch((error) => {
                        console.error('Error creating user:', error);
                        setLoading(false); // Reset loading state in case of error
                      });
                    }
                    // setInterval(() => {
                    //   setLoading(false)
                    // }, 1000);
                  })} className=" space-y-3 md:space-y-3" >
                    <div>
                      {err ? <p className='text-red-700 font-semibold text-lg'>{err}</p> : " "}
                      <label htmlfor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input {...register("username", {
                        required: "E-mail is Required",
                        pattern: {
                          value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                          message: 'E-mail not valid',
                        },
                      })} type="email" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                      {/* {errors.username ? <p className='text-red-800'>{errors.email.message}</p> : " "} */}
                    </div>
                    {
                      flag ? <div>
                        <label htmlfor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                        <input {...register("name", {
                          required: "name is Required",
                        })} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" />
                      </div> : " "
                    }
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input {...register("password", {
                        required: "password is Required",
                      })} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                    </div>
                    <div className="flex items-center justify-between">
                      <button type='submit' className='bg-blue-900 text-white rounded-md  p-2'>
                        {loading ? <RiLoader3Line className='animate-spin' /> : "Register"}
                      </button>
                    </div>

                    <p className="text-sm font-light md:-mt-10  text-gray-500 dark:text-gray-400">
                      " {flag ? "" : "Don't"}  Have an account "    <span onClick={() => setFlag(!flag)} className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"> {flag ? "Sign in" : "Register Now"}
                      </span>
                    </p>
                  </form> : <form onSubmit={handleSubmit((data) => {
                    console.log(loading);
                    setLoading(true)
                    dispatch(loginUserAsync({
                      username: data.username,
                      password: data.password
                    }))
                    setInterval(() => {
                      setLoading(false)
                    }, 1000);
                  })} className=" space-y-3 md:space-y-3" >
                    <div>
                      {err ? <p className='text-red-700 font-semibold text-lg'>{err}</p> : " "}
                      <label htmlfor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input {...register("username", {
                        required: "E-mail is Required",
                        pattern: {
                          value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                          message: 'E-mail not valid',
                        },
                      })} type="email" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                      {/* {errors.username ? <p className='text-red-800'>{errors.username}</p> : " "} */}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input {...register("password", {
                        required: "password is Required",
                      })} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      {/* {errors.password ? <p className='text-red-800'>{errors.password}</p> : " "} */}
                    </div>
                    <div className="flex items-center justify-between">
                      <button type='submit' className='bg-blue-900 text-white rounded-md  p-2'>
                        {loading ? <RiLoader3Line className='animate-spin' /> : "Login"}
                      </button>
                    </div>

                    <p className="text-sm font-light md:-mt-10  text-gray-500 dark:text-gray-400">
                      " {flag ? "" : "Don't"}  Have an account "    <span onClick={() => setFlag(!flag)} className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"> {flag ? "Sign in" : "Register Now"}
                      </span>
                    </p>
                  </form>
                }

              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Login