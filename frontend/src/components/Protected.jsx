import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Protected = ({children}) => {

    let user = useSelector(state => state.auth.loggedInUser)

    const exits = localStorage.getItem('user')

    console.log(exits);

    if ( !user  ) {
      console.log(exits);
        return <Navigate to={"/"} replace="true" ></Navigate>
    }

  return children;
}

export default Protected