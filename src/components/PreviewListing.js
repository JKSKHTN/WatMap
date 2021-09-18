import React, {useEffect, useState} from 'react'
import {Carousel, Image} from "react-bootstrap";
import firebase from "firebase/app";

export default function PreviewList() {
    const listingRef = firebase.firestore().collection("listings")
    const [info, setInfo] = useState()
    const [docid, setDocid] = useState()
    const [loading, setLoading] = useState()
    var storageRef = firebase.storage();

    function getListing() {
      setLoading(true)
        listingRef.doc('manicures-zNC0wN').get().then((doc) => {
            setInfo(doc.data())
            console.log(doc.data())
        })
        setLoading(false)
    }

    useEffect(() => {
		getListing();
	}, []);

  if(loading) {
    return <h1>Loading...</h1>
  }

	return (
		<div>{info && <>
            <Carousel>
            {/* {images.map((img) => {
                <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/150"
                  alt="First slide"
                />
              </Carousel.Item>
            })} */}
            </Carousel>
			      <h1>{info.title}</h1>
            <p>{info.description}</p>
            </>
          }
		</div>
	)
}
