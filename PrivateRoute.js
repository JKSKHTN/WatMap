import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useAuth} from "./contexts/AuthContext.js"

import { navigate } from "@reach/router"

export default function PrivateRoute({component: Component, ...rest}) {
    const { currentUser } = useAuth()
    if(!currentUser){
        navigate("/signup")



    }

    return (
        <Route
            {...rest}
            render={props => {
                return currentUser ? <Component {...props} /> : <Redirect to="/signup" />
            }}
        >
        </Route>

    )
}