import React from 'react'
import {useAuth} from "./contexts/AuthContext.js"
import { navigate } from "@reach/router"

export default function CheckAuth() {
    const { currentUser } = useAuth()
    if(!currentUser){
        navigate("/signup")
    }
}