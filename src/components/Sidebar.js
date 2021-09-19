import React, { useState, useEffect } from 'react'
import { Offcanvas, Card, Spinner } from "react-bootstrap"

import firebase from 'firebase';
import { getServices } from './Map';

export default function Sidebar({ centerMap }) {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const toggleShow = () => setShow((s) => !s);
	const serviceRef = firebase.firestore().collection("listings")

	const [services, setServices] = useState(null)
	// console.log(serviceRef.getDocuments());

	useEffect(async () => {
		let services = await getServices();
		console.log(services);
		setServices(services);
	}, [])


	if (services) {
		return (
			<>
				
				{services.map((service) => {
					return (
						<IndividualServiceListing name={service.title} service={service} description={service.description} centerMap={centerMap} />
					);
				})}
			</>
		)
	}
	return (<><Spinner animation="border" /> </>);
}



function IndividualServiceListing({ name, description, centerMap, service }) {
	return (
		<Card onClick={() => { console.log("test"); centerMap(service.location) }}>
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Text>
					{description}
				</Card.Text>
			</Card.Body>
		</Card>

	);
}


