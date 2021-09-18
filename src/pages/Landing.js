import React from 'react'
import "./landing.css";
import { Button, Card } from "react-bootstrap";
import { Link } from "@reach/router"

export default function Landing() {
	return (
		<div>
			<div class="row">
				<div class="col-md-12 landingpage-maincol">
					<p class="landingpage-text">Welcome to WatMap!</p>
					<div class="row landingpage-buttonrow">
						<div className="d-flex justify-content-center">
						<div class="">
							<Link to="/login" className="nav-link"><Button bsPrefix="landingpage-button">Login</Button> </Link>
						</div>
						<div class="">
							<Link to="/signup" className="nav-link"><Button bsPrefix="landingpage-button">Sign Up</Button> </Link>
						</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
