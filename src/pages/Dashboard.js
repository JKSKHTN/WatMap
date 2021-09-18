import React from 'react'
import Navigation from '../components/navigation'
import CheckAuth from '../PrivateRoute'

export default function Dashboard() {
	CheckAuth();

	return (
		<div>
			Welcome!
			<Navigation></Navigation>
			
		</div>
	)
}
