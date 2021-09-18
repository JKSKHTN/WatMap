import React from 'react'
import { Router, Link } from "@reach/router"
import { Button } from "react-bootstrap";
import {useAuth} from "../contexts/AuthContext.js"
import { navigate } from "@reach/router"

export default function LogOut() {
    const { logout } = useAuth()

    async function handleLogout() {
        try {
            await logout();
            navigate("/home")
        } catch {
            console.log("err")
        }
    }

	return (
		<div>
            <Button onClick={handleLogout} variant="primary">Logout</Button> 
		</div>
	)
}