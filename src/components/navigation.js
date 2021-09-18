import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";


import { Router, Link } from "@reach/router"

import {useAuth} from "../contexts/AuthContext"

let navbarpages = [
	{
		name: "Home",
		url: "/home"
	},
	{
		name: "Signup",
		url: "/signup"
	},
	{
		name: "Dashboard",
		url: "/dashboard"
	},
]
export default function Navigation() {

	const { currentUser } = useAuth()

	return (
		<div>
			{/* collapseOnSelect */}
				<Navbar  expand="lg" bg="dark" variant="dark">
					<Container>
						<Navbar.Brand href="">React-Bootstrap</Navbar.Brand>
						<Navbar.Toggle aria-controls="responsive-navbar-nav" />
						<Navbar.Collapse id="responsive-navbar-nav">
							<Nav className="me-auto">
								<Link to="/" className="nav-link"> Home </Link>
								{currentUser ? 
								<Link to="/dashboard" className="nav-link">Dashboard</Link>: 
								<Link to="/signup" className="nav-link">Signup</Link>}


								{/* <Nav.Link href="/dashboard">Dashboard</Nav.Link> */}
								{/* <Nav.Link href="/signup">Signup</Nav.Link> */}
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
		</div>
	)
}
