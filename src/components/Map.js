import React, { Component, useState } from 'react';
import { Button, Container, Col, Row, Modal } from "react-bootstrap"
import GoogleMapReact from 'google-map-react';
import Sidebar from './Sidebar';
import ListServiceForm from "../components/serviceList"

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function MapContainer() {
	const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [locationClicked, setLocationClicked] = useState(null)

  const defaultProps = {
    center: {
      lat: 43.47244938593337,
      lng: -80.54500110716826
    },
    //bounds: { nw, se, sw... },
    zoom: 14,
    minZoom: 13.5,
    restriction: {
      north: ;
      south: ;
      west: ;
      east: ;
    }
  };

  return (

    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>

      <Container style={{ height: "100%" }}>
        <Row>
          <Col sm={2}>
            <Sidebar />
          </Col>

          <Col sm={10}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
              onClick={(e) => {setLocationClicked({lat: e.lat, lng: e.lng}); setShowAddServiceModal(true);}}
            >
              <MapPin
                lat={43.472449}
                lng={-80.54500}
                text="My Marker"
              />
            </GoogleMapReact>
          </Col>
        </Row>
      </Container>

      <AddServiceModal show={showAddServiceModal} location={locationClicked} handleClose={() => setShowAddServiceModal(false)} />
    </div>
  );

}

function MapPin() {
  return (<>
    <Button variant="light">Barber Shop</Button>
  </>);
}
/* <MapWithASearchBox /> */
/*
<Map
  google={this.props.google}
  zoom={15}
  style={mapStyles}
  initialCenter={
    {
      lat: 43.47244938593337,
      lng: -80.54500110716826
    }
  }
  minZoom= {13.5}
  maxZoom={0}
  
/>
*/

// <Button variant="primary" className="plus-button" onClick={this.props.showModal}>+</Button>


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