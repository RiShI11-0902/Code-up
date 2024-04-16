import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router";
import { Link, Navigate } from "react-router-dom";
import { logoutUserAsync } from "../../store/reducers/authReducer";
// import { logoutUserAsync } from "../store/slice";

const Navbar = () => {
  const [toggle, setToggle] = useState(true)
  const selectUser = useSelector(state => state.auth.loggedInUser)
  const [isOpen, setIsOpen] = useState(false)
  //   const options = ["Settings", "Sell Plants", "Logout",]
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  // const show = () => {
  //   if ( isOpen ) {
  //     setIsOpen( false )
  //   }
  //   setIsOpen(true );
  // }

  // const selectUser = useSelector()

  return (
    <>
      {selectUser == null && <Navigate to={"/"} replace={true} ></Navigate>}
      <div className="navbar flex items-center -ml-7 space-x-0 w-full mx-auto md:space-x-40 my-8 mb-10 border-b-2 pb-8">

        <div className="left  w-full flex items-center justify-evenly flex-row">
          <div className="logo  ml-5  text-black  text-4xl font-bold ">
            code<sup className="text-sm">Up</sup>.
          </div>
          <div>
            <ul className="sm:flex space-x-5 font-bold hidden md:block md:flex md:items-center md:flex-row">
            <Link to={"/quiz-homepage"} className="cursor-pointer hover:text-blue-800" >Home</Link>
              <Link to={"/leaderboard"} className="cursor-pointer hover:text-blue-800" >Leaderboard</Link>
              <Link to={"/about"} className="cursor-pointer hover:text-blue-800" >About</Link>
              <li className="cursor-pointer hover:text-blue-800" onClick={() => dispatch(logoutUserAsync())}>Log out</li>
            </ul>
          </div>
        </div>
        <div className="right-mobile  sm:block md:hidden xl:hidden 2xl:hidden ">
          <div className="nav-items my-4">
            {
              toggle ? (
                ""
              ) :
                <div className=" absolute bg-blue-200 rounded-3xl  w-72 translate-x-10 top-28 left-0 ">
                  <div className="nav-items my-4">
                    <ul className="flex flex-col space-y-5 items-center font-bold">
                    <Link to={"/quiz-homepage"} className="cursor-pointer hover:text-blue-800" >Home</Link>
                      <Link to={"/leaderboard"} className="cursor-pointer" >Leaderboard</Link>
                      <Link to={"/about"} className="cursor-pointer" >About</Link>
                      <li onClick={() => dispatch(logoutUserAsync())}>Log out</li>
                    </ul>
                  </div>
                </div>
            }
          </div>
        </div>


        <div className="md:hidden">
          {
            toggle ? <GiHamburgerMenu onClick={() => setToggle(false)} /> : <AiOutlineClose onClick={() => setToggle(true)} />
          }
        </div>

      </div >
    </>
  );
};

export default Navbar;
