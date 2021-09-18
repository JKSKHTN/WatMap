import React from 'react'


import { Router, Link } from "@reach/router"

export default function navigation() {
	return (
		<div>
			{/* this is all temp */}
			<nav style={{display: "flex"}}>
			<Link to="/home">Dashboard</Link>
			<Link to="/signup">Signup</Link>
			<Link to="/dashboard">Dashboard</Link>
			</nav>
			
		</div>
	)
}
