import React, { useRef, useState, useEffect} from 'react'
import CheckAuth from '../PrivateRoute';
import firebase from "firebase/app";
import { useAuth } from '../contexts/AuthContext';
import { APP_NAME } from "../constants";
import { Form, Button, Container, Alert, Spinner, Card, Row, Col, Modal } from "react-bootstrap";
import { getServices } from './Map';
import ListServiceForm from './serviceList.js' 

export default function Profile() {
	// if(!CheckAuth()){
	// 	return 
	// }

	const nameRef = useRef();
	const [nameInput, setNameInput] = useState("");
	const { currentUser } = useAuth();
	const [loading, setLoading] = useState(false);

	const [inEditMode, setInEditMode] = useState(true);

	const [services, setServices] = useState(null)

	useEffect(async () => {
		let services = await getServices();
		services = services.filter(service => service.owner === currentUser.uid);
		setServices(services);
	}, [])

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



	// await getServices();

	if (currentUser && !loading) {

		return (
			<>
				{!inEditMode ?

					<div className="mt-5 mx-5">
						<Button className="float-end mr-5" onClick={() => { setInEditMode(true) }}> Update Profile Info</Button>
						<Container className="text-center">
							<h2 class="fs-1 mb-3"> Welcome{` ${currentUser.displayName} `}!</h2>
							<h2> Your Services </h2>
							 <Row>
          					{services && services.map((service => <Col sm={2}><IndividualProfileServiceListing service={service} /></Col>))}
							</Row>
						</Container>
					</div> :

					<div className="text-center mt-4">
						{!currentUser.displayName && <h2> Welcome to {APP_NAME}</h2>}
						{!currentUser.displayName ? <p>Please enter your name:</p> : <h1>Please enter your new name!</h1>}
						<input type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
						<Button onClick={() => updateNameInFirebase(nameInput)}> Done</Button>
					</div>}
			</>
		)
	}
	return (<><Spinner animation="border" /> </>);
}

function IndividualProfileServiceListing({ service }) {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
		<Card >
			<Card.Body>
				<Card.Title>{service.title}</Card.Title>
				<Card.Text>
					{service.description}
				</Card.Text>
				<Button onClick={handleShow}>Edit Service</Button>
			</Card.Body>
		</Card>

		<Modal show={show} onHide={handleClose}>
		<Modal.Header closeButton><Modal.Title>Editing {service.title}</Modal.Title></Modal.Header>
		<Modal.Dialog>
			<Modal.Body>
				<ListServiceForm />
			</Modal.Body>
		</Modal.Dialog>
		</Modal>
		</>

	);
}
