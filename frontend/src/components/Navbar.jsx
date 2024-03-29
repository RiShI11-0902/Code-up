import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
// import { logoutUserAsync } from "../store/slice";

const Navbar = () => {
  const [toggle, setToggle] = useState(true)
  const selectUser = useSelector(state => state.auth.loggedInUser)
  const [isOpen, setIsOpen] = useState(false)
//   const options = ["Settings", "Sell Plants", "Logout",]
//   const navigate = useNavigate();
  const dispatch = useDispatch();

  // const show = () => {
  //   if ( isOpen ) {
  //     setIsOpen( false )
  //   }
  //   setIsOpen(true );
  // }

  return (
    <>

      <div className="navbar flex items-center -ml-7 space-x-0 w-full mx-auto md:space-x-40 my-8">
        <div className="left  w-full flex items-center justify-evenly flex-row">
          <div className="logo  ml-5  text-black  text-4xl font-bold ">
            code<sup className="text-sm">Up</sup>.
          </div>
          <div>
            <ul className="sm:flex space-x-5 font-bold hidden md:block md:flex md:items-center md:flex-row">
              <Link to={"/leaderboard"} className="cursor-pointer" >Leaderboard</Link>
              <li className="cursor-pointer">About</li>
              <li className="cursor-pointer">Contact</li>
             {/* <li>{ selectUser ? <Link to={`/cart/${selectUser.id}`}><img className="w-9" src={bag}  /></Link> : " " }</li>  */}
            </ul>
          </div>
          <div>
            <div className="text-green-950 text-2xl font-extrabold cursor-pointer  flex flex-row space-x-4" >

            </div>
            {/* {
              selectUser ?
                <div className="flex flex-row space-x-5">
                  <p>{selectUser.name} </p>
                  <img onClick={() => isOpen ? setIsOpen(false) : setIsOpen(true)} src={user} className="w-10" alt="" /> <br />
                  <div className="flex absolute top-20 right-44 text-lg font-semibold cursor-pointer flex-col">
                    {
                      isOpen ?
                        options.map((i) => {
                          return <div>
                            <p className="" onClick={() => dispatch(logoutUserAsync())}>{i}</p>
                          </div>
                        })
                        : " "
                    }
                  </div>
                </div>
                : <button className='bg-green-500 p-2.5 px-5 rounded-full' onClick={() => navigate("/login")}>Sign in</button>
            } */}
          </div>
        </div>



        <div className="right-mobile  sm:block md:hidden xl:hidden 2xl:hidden ">
          <div className="nav-items my-4">
            {
              toggle ? (
                ""
              ) :
                <div className=" absolute bg-green-200 rounded-3xl  w-72 translate-x-10 top-16 left-0 ">
                  <div className="nav-items my-4">
                    <ul className="flex flex-col space-y-5 items-center font-bold">
                      <li>Everything's</li>
                      <Link to={"/leaderboard"} className="cursor-pointer" >Leaderboard</Link>
                      <li>Flowers</li>
                      <li >Contact</li>
                      {/* { selectUser ? <li><Link to={`/cart/${selectUser.id}`}><img className="w-9" src={bag}  /></Link></li> : " " } */}
                    </ul>
                    {/* <div>
                      {
                        selectUser ?
                          <span className="text-green-950 text-2xl font-extrabold"> Hello, {selectUser.name}</span>
                          : <button className='bg-green-500 p-2.5 px-5 rounded-full' onClick={() => navigate("/login")}>Sign in</button>
                      }
                    </div> */}
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
