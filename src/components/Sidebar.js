import React, { useState, useEffect } from 'react'
import { Offcanvas, Card, Spinner, Button } from "react-bootstrap"

import firebase from 'firebase';
import { getServices } from './Map';

export function checkIfServiceInSearch(service, searchVal){
	return (service && service.description && service.description.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1 || (service && service.title && service.title.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1) || searchVal === "");
}
export default function Sidebar({ centerMap, searchVal, setSearchVal }) {
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
				<h6 className="text-muted">Search for services</h6>
				<input type="text" value={searchVal} onChange={(e) => setSearchVal(e.target.value)} />
				{/* <Button>Search</Button> */}
				<div>
					{services.map((service) => {
						console.log("serivce is", service.description)
						if (checkIfServiceInSearch(service, searchVal)) {
							return (
								<IndividualServiceListing name={service.title} service={service} description={service.description} centerMap={centerMap} />
							);
						}
					})}
				</div>
			</>
		)
	}
	return (<><Spinner animation="border" /> </>);
}



function IndividualServiceListing({ name, description, centerMap, service}) {
	return (
		<Card className="mb-2" onClick={() => { console.log("test"); centerMap(service.location) }}>
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Text>
					{description}
				</Card.Text>
			</Card.Body>
		</Card>

	);
}


