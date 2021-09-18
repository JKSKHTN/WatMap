import React, { useRef, useState } from 'react'
import Navigation from './Navigation'
import { Form, Button, Container, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import LogOut from './Logout';
import firebase from "firebase/app";
import "firebase/storage";
import { useAuth } from "../contexts/AuthContext.js";
import { navigate } from "@reach/router"


export default function ListServiceForm() {
    const serviceName = useRef();
    const serviceDescription = useRef();
    const images = useRef();
    const location = useRef();
    const serviceRef = firebase.firestore().collection("listings")
    var storageRef = firebase.storage().ref();
    const {currentUser} = useAuth()
    const [URLFunc, setURLFunc] = useState()
    const [ID, setID] = useState()

    function handleService() {
        serviceRef.doc(ID).set({
            title: serviceName.current.value,
            description: serviceDescription.current.value,
            location: location.current.value,
            owner: currentUser.uid,
            photosRef: '',
        }).then(() => {
            if (images.current.files.length > 0) {
                const picRef = storageRef.child(`${ID}/${ID}.png`);
                picRef.put(images.current.files[0]).then((snapshot) => {
                    console.log("Uploaded a pic!");
                });
            }
        }).then(() => {
            var coverRef = storageRef.ref(`${ID}/${ID}.png`);
            coverRef
              .getDownloadURL()
              .then((URL) => {
                setURLFunc(URL);
              })
              .then(() => {
              });
            serviceRef.doc(ID).update({
                photosRef: ''
            })
        })
    }

    const handleTitle = (e) => {
        setID(e.target.value.replace(/ /g, "-").toLowerCase() + "-" + btoa(dayjs().format()).substring(23, 29));
    };

    function handleSubmit() {
        console.log("submitting")
    }

    return (
        <div className="mt-1 mx-3">
            <p>{ID}</p>
            <Form onSubmit={handleSubmit}>
            <Form.Group id="ServiceName" className="mb-3 form-floating">
                <Form.Control type="text" ref={serviceName} className="form-control" placeholder="Service Name" id="InputServiceName" aria-describedby="service name" />
                <Form.Label for="InputServiceName" className="form-label floatingInput" onChange={handleTitle}>
                  Service Name
                </Form.Label>
              </Form.Group>
              <Form.Group id="ServiceDescription" className="mb-3 form-floating">
                <Form.Control as="textarea"
                  style={{
                    height: "200px",
                  }} type="text" ref={serviceDescription} className="form-control" placeholder="Service Description" id="InputServiceDescription" aria-describedby="service description" />
                <Form.Label for="InputServiceDescription" className="form-label floatingInput">
                  Service Description
                </Form.Label>
              </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Upload photos of your service!</Form.Label>
                <Form.Control ref={images} type="file" multiple />
            </Form.Group>
            </Form>
        </div>
    )

}