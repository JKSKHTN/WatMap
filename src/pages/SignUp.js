import React, { useState, useEffect } from 'react'
import firebase from "firebase/app";
import { useAuth } from "../contexts/AuthContext.js";
import Navigation from '../components/navigation.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import LogOut from '../components/logout.js';


const uiConfig = {
	// Popup signin flow rather than redirect flow.
	signInFlow: 'popup',
	// Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.

	signInSuccessUrl: '/dashboard',
	// We will display Google and Facebook as auth providers.
	signInOptions: [
		firebase.auth.EmailAuthProvider.PROVIDER_ID,
		// firebase.auth.FacebookAuthProvider.PROVIDER_ID,
	],
};

export default function SignUp() {
	let userRef = firebase.firestore().collection("users");
	const [data, setData] = useState('')

	//const { currentUser, signup } = useAuth();

	function getInfo() {
		userRef.doc("test").get().then((doc) => {
			setData(doc.data()["name"])
		})
	}

	useEffect(() => {
		getInfo();
	}, [])

	return (
		<div>
			<Navigation />
			<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
			<LogOut />
			Sign Up {data}
		</div>
	)
}
