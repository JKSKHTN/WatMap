import React, { Component, useState, useEffect } from 'react';
import { Button, Container, Col, Row, Modal, Spinner } from "react-bootstrap"
import GoogleMapReact from 'google-map-react';
import Sidebar from './Sidebar';
import ListServiceForm from "../components/serviceList"
import firebase from 'firebase/app';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export async function getServices() {
  const snapshot = await firebase.firestore().collection('listings').get()
  return snapshot.docs.map(doc => doc.data());
}

export default function MapContainer() {
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [locationClicked, setLocationClicked] = useState(null)
  const [services, setServices] = useState(null)

  const [centerLocation, setCenterLocation] = useState({
    lat: 43.47244938593337,
    lng: -80.54500110716826
  });

  const defaultProps = {
    center: {
      lat: 43.47244938593337,
      lng: -80.54500110716826
    },
    //bounds: { nw, se, sw... },
    zoom: 14
    
  };



  useEffect(async () => {
    let services = await getServices();
    console.log(services);
    setServices(services);
  }, [])

  if (!services) {
    return (<><Spinner animation="border" /> </>);
  }
  console.log(services);

  console.log(centerLocation)
  return (

    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>

      <Container style={{ height: "100%" }}>
        <Row>
          <Col sm={2}>
            <Sidebar  centerMap={setCenterLocation} />
          </Col>

          <Col sm={10}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
              defaultCenter={centerLocation}
              defaultZoom={defaultProps.zoom}
              onClick={(e) => { setLocationClicked({ lat: e.lat, lng: e.lng }); setShowAddServiceModal(true); }}
              key={JSON.stringify(centerLocation)}
              options={{
                minZoom: 13,
                maxZoom: 15,
                  restriction: {
                    latLngBounds:{
                    north: 43.524162,
                    south: 43.392919,
                    west: -80.620541,
                    east: -80.381183
                    },
                    strictBounds: true
                  }
              }}
            >

              {services.map((service) => {
                return (
                  <MapPin
                    lat={service.location.lat}
                    lng={service.location.lng}
                    title={service.title}
                  />
                );
              })}
            </GoogleMapReact>
          </Col>
        </Row>
      </Container>

      <AddServiceModal show={showAddServiceModal} location={locationClicked} handleClose={() => setShowAddServiceModal(false)} />
    </div>
  );

}


function CenterMap(location) {
  // TEMP
}


function MapPin({ title }) {
  return (<>
    <Button variant="light">{title}</Button>
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


function AddServiceModal({ show, handleClose, location }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a new service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListServiceForm closeModal={handleClose} location={location} />

      </Modal.Body>
      {/* <Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
			</Modal.Footer> */}
    </Modal>);

}