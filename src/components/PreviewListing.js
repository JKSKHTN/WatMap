import React, {useEffect} from 'react'
import {Carousel, Image} from "react-bootstrap";

export default function PreviewList() {
    function getListing() {
        console.log('getting')
    }

    useEffect(() => {
		getListing();
	}, []);

	return (
		<div>
            <Carousel>
            {images.map((img) => {
                <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/150"
                  alt="First slide"
                />
              </Carousel.Item>
            })}
            </Carousel>
			<h1>Title</h1>
            <p>Description</p>

		</div>
	)
}
