import React from 'react';
import	{Row} from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';

export default function Banner(){
	return (
		
			<Row>
				<Carousel fade className="p-5 m-1">
				  <Carousel.Item>
				    <img
				      className="d-block w-100"
				      src={require("../images/lugaw.png")}
				      alt="First slide"
				      width="450px" 
				      height="500px"
				    />

				  </Carousel.Item>
				  <Carousel.Item>
				    <img
				      className="d-block w-100"
				      src={require("../images/girshop2.png")}
				      alt="Second slide"
				      width="450px" 
				      height="500px"
				    />
				  
				  </Carousel.Item>
				</Carousel>
				
			</Row>
		
	)

}