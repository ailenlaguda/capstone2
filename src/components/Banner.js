import React from 'react';
import	{Row, Col, Button} from "react-bootstrap";

export default function Banner(){
	
	return (

		<Row>
		 	<link rel="stylesheet" href="index.css"/>
		    <link rel="preconnect" href="https://fonts.googleapis.com"/>
			<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
			<link href="https://fonts.googleapis.com/css2?family=Lobster&family=Open+Sans&display=swap" rel="stylesheet"/>
		    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
			
			<div className="jumbotron container-fluid text-center">
				<h1 id="title1" className="display-4 p-0 mt-0">Bentuco National High School Faculty Cooperative</h1>
	  			<b><h3 className="display-5">Loan & Savings Management System</h3></b>
	  		
	  			<p className="lead"><strong>
	  				“Stop being chained down by bad credit I have the key to set you free...”― Tyler Gregory
	  			</strong></p>
			</div>
		</Row>
	)

}