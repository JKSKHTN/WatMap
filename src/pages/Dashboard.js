import React, {useEffect, useState} from 'react'
import Navigation from '../components/Navigation'
import CheckAuth from '../PrivateRoute'
import Profile from '../components/Profile.js';
import PreviewList from '../components/PreviewListing.js';
import firebase from "firebase/app";
import { useAuth } from "../contexts/AuthContext.js"

export default function Dashboard() {
	CheckAuth();

	let { currentUser } = useAuth();
	const [user, setUser] = useState();
	const [loading, setLoading] = useState();
	const [onboarded, setOnboarded] = useState();
	const userRef = firebase.firestore().collection("users")

	function getUser() {
		setLoading(true)
		userRef.doc(currentUser.uid).onSnapshot((doc) => {
			if(doc.exists) {
				//setUser(doc.data())
			} 
		})
		setLoading(false)
	}


	useEffect(() => {
		getUser();
	}, []);

	if (loading) {
		return <h1>Loading...</h1>
	}


	return (
		<div>
			<Navigation></Navigation>
			<Profile />
		</div>
	)
}
