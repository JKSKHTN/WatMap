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
			{/* <LogOut></LogOut> */}
			{/* Home page */}

			<MapContainer ></MapContainer>
		</div>
	)
}

