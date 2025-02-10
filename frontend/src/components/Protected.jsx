import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Cookies from "js-cookie";

const Protected = ({children}) => {

    let user = useSelector(state => state.auth.loggedInUser)

    const exits = Cookies.get('token')

    const id = localStorage.getItem('user')

    // console.log(exits);

    if ( !id  ) {
      console.log(id);
        return <Navigate to={"/"} replace="true" ></Navigate>
    }

  return children;
}

export default Protected