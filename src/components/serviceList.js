import React, { useRef, useState } from 'react'
import Navigation from './Navigation'
import { Form, Button, Container, Alert, Spinner } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import LogOut from './Logout';
import firebase from "firebase/app";
import "firebase/storage";
import { useAuth } from "../contexts/AuthContext.js";
import { navigate } from "@reach/router"


export default function ListServiceForm({location, closeModal}) {
    const serviceName = useRef();
    const serviceDescription = useRef();
    const images = useRef();
    const serviceRef = firebase.firestore().collection("listings")
    var storageRef = firebase.storage();
    const {currentUser} = useAuth()
    const [URLFunc, setURLFunc] = useState()
    const [loading, setLoading] = useState()
    const [ID, setID] = useState()
    var dayjs = require("dayjs");

    var customParseFormat = require("dayjs/plugin/customParseFormat");
    dayjs.extend(customParseFormat);

    function handleService(e) {
        e.preventDefault();
        console.log(images)
        const urls = []
        serviceRef.doc(ID).set({
            title: serviceName.current.value,
            description: serviceDescription.current.value,
            location: location,
            owner: currentUser.uid,
            // photosRef: '',
        }).then(() => {
            if (images.current.files.length > 0) {
                for (const file in images.current.files) {
                // images.current.files.map((file, index) => {
                    if(file !== 'item' && file !== 'length') {
                        const picRef = storageRef.ref().child(`${ID}/${ID}${file}.png`);
                        picRef.put(images.current.files[file]).then((snapshot) => {
                            console.log("Uploaded a pic!");
                            storageRef.ref(`${ID}/${ID}${file}.png`).getDownloadURL().then((URL) => {
                                urls.push(URL)
                            })
                        });
                    }
                // })
                }
            }


        }).then(() => {
            setLoading(true);
            window.location.reload();
            // serviceRef.doc(ID).update({
            //     photosRef: urls
            // })
            
        })
    }

    const handleTitle = (e) => {
        console.log(images)
        setID(e.target.value.replace(/ /g, "-").toLowerCase() + "-" + btoa(dayjs().format()).substring(23, 29));
    };

    if(loading) {
        return (<><Spinner animation="border" /> </>)
    }

    return (
        <div className="mt-1 mx-3">
            <Form onSubmit={handleService}>
            <Form.Group id="ServiceName" className="mb-3 form-floating">
                <Form.Control onChange={handleTitle} type="text" ref={serviceName} className="form-control" placeholder="Service Name" id="InputServiceName" aria-describedby="service name" required/>
                <Form.Label for="InputServiceName" className="form-label floatingInput">
                  Service Name
                </Form.Label>
              </Form.Group>
              <Form.Group id="ServiceDescription" className="mb-3 form-floating">
                <Form.Control as="textarea"
                  style={{
                    height: "200px",
                  }} type="text" ref={serviceDescription} className="form-control" placeholder="Service Description" id="InputServiceDescription" aria-describedby="service description" required/>
                <Form.Label for="InputServiceDescription" className="form-label floatingInput">
                  Service Description
                </Form.Label>
              </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Upload photos of your service!</Form.Label>
                <Form.Control ref={images} type="file" multiple required/>
            </Form.Group>
            <Button type="submit">Submit</Button>
            </Form>
        </div>
    )

}