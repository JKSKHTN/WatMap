import React, { useEffect, useState } from 'react'
import { Carousel, Image, Spinner, Card } from "react-bootstrap";
import firebase from "firebase/app";
import { useAuth } from "../contexts/AuthContext"

export default function PreviewList() {
  const listingRef = firebase.firestore().collection("listings")
  const [info, setInfo] = useState()
  const [docid, setDocid] = useState()
  const [pics, setPics] = useState()
  const [loading, setLoading] = useState()
  const { currentUser } = useAuth();

  var storageRef = firebase.storage();

  // function getListing() {
  //   setLoading(true)
  //   const pictures = [];
  //   listingRef.doc('manicures-zNC0wN').get().then((doc) => {
  //     setInfo(doc.data())
  //     storageRef.ref().child(doc.id).listAll()
  //       .then((res) => {
  //         res.items.forEach((itemRef, index) => {

  //           storageRef.ref().child(`${doc.id}/${doc.id}${index}.png`).getDownloadURL()
  //             .then((URL) => {
  //               pictures.push(URL)
  //               //setPics(pictures)
  //               // setPics(pictures + [URL])
  //             }).then(() => {
  //               console.log('end')
  //               console.log(pictures)
  //               setPics(pictures)
  //             })
  //         });
  //       })
  //   }).then(() => {
  //     // storageRef.ref().child(docid).listAll()
  //     //   .then((res) => {
  //     //     res.items.forEach((itemRef, index) => {

  //     //       storageRef.ref().child(`${docid}/${docid}${index}.png`).getDownloadURL()
  //     //         .then((URL) => {
  //     //           pictures.push(URL)
  //     //           console.log(URL)
  //     //         })
  //     //     });
  //     //   })
  //   }).catch((error) => {
  //     console.log(error);
  //     // Uh-oh, an error occurred!
  //   });
  //   setLoading(false)
  // }

  useEffect(() => {
    getListing();
  }, [currentUser]);

  if (loading) {
    return (<><Spinner animation="border" /> </>);
  }

  console.log("pics are", pics);

  // return (

  //   <Card>
  //     <Card.Img variant="top" src="holder.js/100px180" />
  //     <Card.Body>
  //       <Card.Title>Card Title</Card.Title>
  //       <Card.Text>
  //         Some quick example text to build on the card title and make up the bulk of
  //         the card's content.
  //       </Card.Text>
  //       <Button variant="primary">Go somewhere</Button>
  //     </Card.Body>
  //   </Card>
  // );
  if(!pics){
    return (<Spinner animation="border" />);
  }

  return (
    <>
      <Carousel>
        {pics.map((pic) => {
          {console.log("FOUMND PI", pic)}
          return (<Carousel.Item>
            <img
              className="d-block w-100"
              src={pic}
              alt="First slide"
            />
           </Carousel.Item>)
        })}
      </Carousel>

    </>

  );

  return (
    <Card>
      <div>{info && <>
        <Carousel>
          {pics && pics.map((p) => {
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={p}
                alt="First slide"
              />
            </Carousel.Item>

          })}
        </Carousel>
        <h1>{info.title}</h1>
        <p>{info.description}</p>
        {pics && pics.map((p) => {
          return (<p>
            {p}
          </p>)
        })}
      </>
      }
      </div>
    </Card>
  )
}
