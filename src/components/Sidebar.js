import React, { useState } from 'react'
import { Offcanvas, Card } from "react-bootstrap"

export default function Sidebar() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const toggleShow = () => setShow((s) => !s);

	return (
		<>
				<IndividualServiceListing name="Barber Shop" description="testing best barber sho" />
				<IndividualServiceListing name="Barber Shop" description="testing best barber sho" />
				<IndividualServiceListing name="Barber Shop" description="testing best barber sho" />
				<IndividualServiceListing name="Barber Shop" description="testing best barber sho" />
		</>
	)
}



function IndividualServiceListing({ name, description }) {
	return (
		<Card >
			<Card.Body>
				<Card.Title>Barber Shop </Card.Title>
				<Card.Text>
					Some quick example text to build on the card title and make up the bulk of
					the card's content.
				</Card.Text>
			</Card.Body>
		</Card>);
}
