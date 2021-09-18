import React, { useState } from 'react'
import { Modal, Button } from "react-bootstrap"

import Navigation from '../components/Navigation'

import 'bootstrap/dist/css/bootstrap.min.css';
import LogOut from '../components/Logout';
import MapContainer from '../components/Map';
import ListServiceForm from "../components/serviceList";

export default function Home() {
	const [showAddServiceModal, setShowAddServiceModal] = useState(false);
	return (
		<div>

			<Navigation></Navigation>
			<h1 className="text-center mt-5">Welcome to </h1>
			{/* <LogOut></LogOut> */}
			{/* Home page */}

			<MapContainer showModal={() => { setShowAddServiceModal(true) }}></MapContainer>
			<AddServiceModal show={showAddServiceModal} handleClose={() => setShowAddServiceModal(false)} />
		</div>
	)
}

function AddServiceModal({ show, handleClose }) {
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Add a new service</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<ListServiceForm closeModal={handleClose} />

			</Modal.Body>
			{/* <Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
			</Modal.Footer> */}
		</Modal>);

}
