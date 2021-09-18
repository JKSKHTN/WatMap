import React, { useRef, useState, useEffect } from 'react'
import CheckAuth from '../PrivateRoute';
import firebase from "firebase/app";
import { useAuth } from '../contexts/AuthContext';
import { APP_NAME } from "../constants";
import { Form, Button, Container, Alert , Spinner} from "react-bootstrap";

export default function Profile() {
	// if(!CheckAuth()){
	// 	return 
	// }

	const nameRef = useRef();
	const [nameInput, setNameInput] = useState("");
	const { currentUser } = useAuth();
	const [loading, setLoading] = useState(false);

	const [inEditMode, setInEditMode] = useState(true);


	useEffect(() => {
		if (currentUser && currentUser.displayName) {
			setNameInput(currentUser.displayName);
			setInEditMode(false);
		}
	}, [currentUser])


	// user.updateProfile({displayName: "test-name"});

	if (currentUser && currentUser.displayName == null && !inEditMode) {
		setInEditMode(true);
	}

	function updateNameInFirebase(name) {
		setLoading(true);
		currentUser.updateProfile({ displayName: name }).then(function () {
			setInEditMode(false);
			setLoading(false);
		});

		console.log(name);
	}

	if (currentUser && !loading) {

		return (
			<>
				{!inEditMode ?

					<div>
						<h2> Welcome {currentUser.displayName} </h2>
						<Button onClick={() => { setInEditMode(true) }}> Update Profile Info</Button>
					</div> :

					<>
						<h2> Welcome to {APP_NAME}</h2>
						<p>Please enter you name</p>
						<input type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
						<Button onClick={() => updateNameInFirebase(nameInput)}> Done</Button>
					</>}
			</>
		)
	}
	return (<><Spinner animation="border" /> </>);
}
