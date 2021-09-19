import React, { useState } from 'react'
import { Modal, Button } from "react-bootstrap"

import Navigation from '../components/Navigation'

import LogOut from '../components/Logout';
import MapContainer from '../components/Map';
import ListServiceForm from "../components/serviceList";
import { APP_NAME } from '../constants';
import CheckAuth from '../PrivateRoute';

export default function Home() {
	CheckAuth();
	
	return (
		<div>

			<Navigation></Navigation>
			<h1 className="text-center mt-5">Welcome to {APP_NAME}</h1>
			<div className="d-flex justify-content-center">
			<p className="text-center mx-5 w-50">WatMap is your hub for finding trusted services from students on campus and earning money from within your campus! To find services, click on a pin on the map to find more about that seller or use the left menu. To sell your own services click anywhere on the map you could provide services from and fill in the information!</p>
			</div>
			{/* <LogOut></LogOut> */}
			{/* Home page */}

			<MapContainer ></MapContainer>
		</div>
	)
}

