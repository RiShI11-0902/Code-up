import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Protected = ({children}) => {

    const user = useSelector(state => state.auth.loggedInUser)

    if (!user) {
        return <Navigate to={"/"} replace="true" ></Navigate>
    }

  return children;
}

export default Protected