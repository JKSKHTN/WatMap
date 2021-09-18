import React, { useState, useEffect } from 'react'
import firebase from "firebase/app";
import { useAuth } from "../contexts/AuthContext.js";
import Navigation from '../components/Navigation.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Logout from '../components/Logout.js';
import LogInForm from '../components/Loginform'

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

	// emailLinkSignIn: function () {
	// 	return {
	// 		// Additional state showPromo=1234 can be retrieved from URL on
	// 		// sign-in completion in signInSuccess callback by checking
	// 		// window.location.href.
	// 		// url: 'https://www.example.com/completeSignIn?showPromo=1234',
	// 		// Custom FDL domain.
	// 		// dynamicLinkDomain: 'example.page.link',
	// 		// Always true for email link sign-in.
	// 		// handleCodeInApp: true,
	// 		// Whether to handle link in iOS app if installed.
	// 		// iOS: {
	// 		// 	bundleId: 'com.example.ios'
	// 		// },
	// 		// Whether to handle link in Android app if opened in an Android
	// 		// device.
	// 		android: {
	// 			packageName: 'com.example.android',
	// 			installApp: true,
	// 			minimumVersion: '12'
	// 		}
	// 	};
};

export default function LogIn() {
	let userRef = firebase.firestore().collection("users");
	let { currentUser } = useAuth();
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
			<h1 className="text-center mt-5">Log In</h1>
			
			{currentUser ?
				<Logout /> :
				<LogInForm />
			}

				{/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> */}
		</div>
	)
}


