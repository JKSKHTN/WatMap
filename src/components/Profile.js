import React from 'react'
import CheckAuth from '../PrivateRoute';
import firebase from "firebase/app";

export default function Profile() {
	CheckAuth();

	const user = firebase.auth()
	console.log(user.currentUser)

	return (
		<div>
			<h2> Welcome </h2>
		</div>
	)
}
