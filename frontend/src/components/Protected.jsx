import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie';

const Protected = ({children}) => {

    const user = useSelector(state => state.auth.loggedInUser)

    const exitsCookie = Cookies.get("connect.sid")
    console.log(exitsCookie);

    if ( !user ) {
      console.log(exitsCookie);
        return <Navigate to={"/"} replace="true" ></Navigate>
    }

  return children;
}

export default Protected