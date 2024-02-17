import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { createUserAsync } from '../../store/reducers/authReducer'
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from 'react-router-dom'
const Login = () => {


  const [flag, setFlag] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const dispatch = useDispatch();
  // const formData = new FormData()
  // formData.append
  const navigate = useNavigate()
  const selectUser = useSelector(state => state.auth.loggedInUser)


  return (
    <>

      {selectUser && <Navigate to={"/quizpage"} replace={true} ></Navigate>}

      <div>
        <section className="-mt-36 -ml-10 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold md:text-gray-900 text-white">
              {/* <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" /> */}
              {flag ? "Register Now" : " Login your account"}
            </a>
            <div className="md:w-[70rem] bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form onSubmit={handleSubmit((data) => {
                  dispatch(createUserAsync({
                    email: data.email,
                    name: data.name,
                    password: data.password
                  }))
                })} className=" space-y-3 md:space-y-3" >
                  <div>
                    <label htmlfor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input {...register("email", {
                      required: "E-mail is Required",
                      pattern: {
                        value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                        message: 'E-mail not valid',
                      },
                    })} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                    {errors.email ? <p className='text-red-800'>{errors.email.message}</p> : " "}
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
                    <label htmlfor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input {...register("password", {
                      required: "password is Required",
                    })} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                  </div>
                  <div className="flex items-center justify-between">
                    <button type='submit' className='bg-blue-900 text-white rounded-md  p-2'>
                      Login
                    </button>
                  </div>
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p className="text-sm font-light md:-mt-10  text-gray-500 dark:text-gray-400">
                    " {flag ? "" : "Don't"}  Have an account "    <span onClick={() => setFlag(!flag)} className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"> {flag ? "Sign in" : "Register Now"}
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>

        </section>
      </div>
    </>
  )
}

export default Login