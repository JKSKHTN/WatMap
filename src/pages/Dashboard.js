import React from 'react'
import Navigation from '../components/Navigation'
import CheckAuth from '../PrivateRoute'
import Profile from '../components/Profile';

export default function Dashboard() {
	CheckAuth();

	return (
		<div>
			<Navigation></Navigation>
			<Profile></Profile>

			
		</div>
	)
}
