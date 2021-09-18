import React from 'react'
import Navigation from '../components/navigation'

import 'bootstrap/dist/css/bootstrap.min.css';
import LogOut from '../components/logout';

export default function Home() {
	return (
		<div>
			<Navigation></Navigation>
			Home page
			<LogOut></LogOut>
			{/* Home page */}
		</div>
	)
}
