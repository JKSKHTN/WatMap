import React from 'react'
import { Router, Link } from "@reach/router"
import { Button } from "react-bootstrap";
import {useAuth} from "../contexts/AuthContext.js"
import { navigate } from "@reach/router"

export default function Logout() {
    const { logout } = useAuth()

    async function handleLogout() {
        try {
            await logout();
            navigate("/login")
        } catch {
            console.log("err")
        }
    }

	return (
		<div>
            <Button bsPrefix="uw-yellow" onClick={handleLogout} >Logout</Button> 
		</div>
	)
}