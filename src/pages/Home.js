import React, { useState } from 'react'
import { Modal, Button } from "react-bootstrap"

import Navigation from '../components/Navigation'

import 'bootstrap/dist/css/bootstrap.min.css';
import LogOut from '../components/Logout';
import MapContainer from '../components/Map';
import ListServiceForm from "../components/serviceList";
import { APP_NAME } from '../constants';

export default function Home() {
	
	return (
		<div>

			<Navigation></Navigation>
			<h1 className="text-center mt-5">Welcome to {APP_NAME}</h1>
			<p className="text-center mx-5">WatMap is your hub for finding trusted services from students on campus and earning money from within your campus! To find services, click on a pin on the map to find more about that seller or use the left menu. To sell your own services click anywhere on the map you could provide services from and fill in the information!</p>
			{/* <LogOut></LogOut> */}
			{/* Home page */}

			<MapContainer ></MapContainer>
		</div>
	)
}

