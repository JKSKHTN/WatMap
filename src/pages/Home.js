import React from 'react'
import Navigation from '../components/Navigation'

import 'bootstrap/dist/css/bootstrap.min.css';
import LogOut from '../components/Logout';
import MapContainer from '../components/Map';

export default function Home() {
	return (
		<div>
			<Navigation></Navigation>
			Home page
			{/* <LogOut></LogOut> */}
			{/* Home page */}
			<MapContainer></MapContainer>
		</div>
	)
}
