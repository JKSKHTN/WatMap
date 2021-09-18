import React, {useEffect, useState} from 'react'
import {Carousel, Image, Spinner} from "react-bootstrap";
import firebase from "firebase/app";

export default function PreviewList() {
    const listingRef = firebase.firestore().collection("listings")
    const [info, setInfo] = useState()
    const [docid, setDocid] = useState()
    const [pics, setPics] = useState([])
    const [loading, setLoading] = useState()
    var storageRef = firebase.storage();

    function getListing() {
      setLoading(true)
      const pictures = []
        listingRef.doc('manicures-zNC0wN').get().then((doc) => {
            setInfo(doc.data())
            setDocid(doc.id)
            console.log(doc.data())
        }).then(() => {
      storageRef.ref().child(docid).listAll()
        .then((res) => {
          // res.prefixes.forEach((folderRef) => {
          //   // All the prefixes under listRef.
          //   // You may call listAll() recursively on them.
          // });
          res.items.forEach((itemRef, index) => {
            setLoading(true)

            storageRef.ref().child(`${docid}/${docid}${index}.png`).getDownloadURL()
            .then((URL) => {
              pictures.push(URL)
              setPics(pictures)


            }) 
            setLoading(false)

          });
          setLoading(false)

        })

      // Find all the prefixes and items.
      
          
        }).catch((error) => {
          // Uh-oh, an error occurred!
        });
        setLoading(false)

    }

    useEffect(() => {
		getListing();
	}, []);

  if(loading) {
    return (<><Spinner animation="border" /> </>);
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
            {pics.map((p) => {
              console.log(p)
            })}
            </>
          }
		</div>
	)
}
