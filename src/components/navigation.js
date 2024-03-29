import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";


import { Router, Link } from "@reach/router"

import { useAuth } from "../contexts/AuthContext"
import Logout from './Logout.js';
import logo from "../assets/WatMap.png";

export default function Navigation() {

	const { currentUser } = useAuth()

	return (
		<div>
			<Navbar expand="lg"  bg="dark" variant="dark">
				<Container>
					<Navbar.Brand href="#"><img
						src={logo}
						width="100"
						// height="50"
						className="d-inline-block align-top"
					/></Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav" style={{justifyContent: 'space-between'}}>
						<Nav className="me-auto">
							<Link to="/home" className="nav-link"> Home </Link>
							{currentUser ?
								<> <Link to="/dashboard" className="nav-link">Dashboard</Link> </> :
								<> <Link to="/signup" className="nav-link">Signup</Link>
								<Link to="/login" className="nav-link">Login</Link> </>}
						</Nav>

						{ currentUser ? 
						<Nav>
							<Logout></Logout>
						</Nav> : null}

					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	)
}
