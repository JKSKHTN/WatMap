import React, { useEffect, useState } from 'react'
import { Carousel, Image, Spinner, Card, Button, CloseButton } from "react-bootstrap";
import firebase from "firebase/app";
import { useAuth } from "../contexts/AuthContext"

export default function PreviewList({ id , closeModal}) {
  const listingRef = firebase.firestore().collection("listings")
  const [info, setInfo] = useState()
  const [docid, setDocid] = useState()
  const [pics, setPics] = useState()
  const [loading, setLoading] = useState()
  const { currentUser } = useAuth();

  var storageRef = firebase.storage();

  async function getListing() {
    setLoading(true)
    const pictures = [];
    let doc = await listingRef.doc(id).get();
    if (!doc.exists) {
      setLoading(false);
      return;
    }
    setInfo(doc.data())
    let resListAll = await storageRef.ref().child(doc.id).listAll();
    let index = 0
    for (const itemRef of resListAll.items) {
      let downloadURL = await storageRef.ref().child(`${doc.id}/${doc.id}${index}.png`).getDownloadURL();
      pictures.push(downloadURL);
      index += 1;
    }
    setPics(pictures);
    console.log("FOUND PICTURES", pictures);
    setLoading(false)
  }


  useEffect(() => {
    getListing();
  }, [currentUser]);

  if (loading) {
    return (<><Spinner animation="border" /> </>);
  }

  console.log("pics are", pics);

  if (!pics) {
    return (

      <Card style={{ width: "500px" }}>
        <Card.Body>
          <Spinner animation="border" />
        </Card.Body>
      </Card>
    );
  }

  console.log(info)
  return (
    <>
      <Card style={{ width: "500px", zIndex: 999999 }} onClick={(e) => {e.stopPropagation()}} >

        <Card.Header>
          <CloseButton onClick={(e) => {e.stopPropagation(); closeModal()}} />
        </Card.Header>

        <Card.Body>
          <Carousel onClick={(e) => { e.stopPropagation() }}>
            {pics.map((pic) => {
              // { console.log("FOUMND PI", pic) }
              return (<Carousel.Item>
                <img
                  className="d-block w-100"
                  src={pic}
                  alt="First slide"
                />
              </Carousel.Item>)
            })}
          </Carousel>
          <h1>{info.title}</h1>
          <p>{info.description}</p>
          
          <Button variant="primary" onClick={() => {alert("Please contact: " )}} >Contact Provider</Button>

        </Card.Body>
      </Card>
    </>

  );

  // return (
  //   <Card>
  //     <div>{info && <>
  //       <Carousel>
  //         {pics && pics.map((p) => {
  //           <Carousel.Item>
  //             <img
  //               className="d-block w-100"
  //               src={p}
  //               alt="First slide"
  //             />
  //           </Carousel.Item>

  //         })}
  //       </Carousel>
  //       <h1>{info.title}</h1>
  //       <p>{info.description}</p>
  //       {pics && pics.map((p) => {
  //         return (<p>
  //           {p}
  //         </p>)
  //       })}
  //     </>
  //     }
  //     </div>
  //   </Card>
  // )
}
