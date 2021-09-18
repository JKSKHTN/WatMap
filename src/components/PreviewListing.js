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

  async function getListing() {
    setLoading(true)
    const pictures = [];
    let doc = await listingRef.doc('manicures-zNC0wN').get();
    setInfo(doc.data())
    let resListAll = await storageRef.ref().child(doc.id).listAll();
    let index = 0
    for (const itemRef of resListAll.items) {
      let downloadURL = await storageRef.ref().child(`${doc.id}/${doc.id}${index}.png`).getDownloadURL();
      pictures.push(downloadURL);
      index += 1;
    }
    setPics(pictures);
    setLoading(false)
  }


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
if (!pics) {
  return (<Spinner animation="border" />);
}

return (
  <>
  <Card>
    <Carousel>
      {pics.map((pic) => {
        { console.log("FOUMND PI", pic) }
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
