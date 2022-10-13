import React from 'react';
import	{Container, Row, Col, Card} from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function Highlights(){
	return (
		<Container>
			<Row>
				<img className ="img-fluid" src={require("../images/pink.png")} alt="logo" />
			</Row>
			<Row>
				<Col>
					<h2 className="text-center welcome">Welcome to our Online Shop!</h2>
	            	<p>We are your one-stop wholesale grocer shop at the town of Irosin. We offer free and fast delivery within the town. We can also deliver within the province at a minimal fee. If you are craving some lugaw and mami, feel free to add to cart and checkout and we can deliver it right away!
	            	</p>
				</Col>

			</Row>
			<Row>
				<Col xs={12} md={6}>
					<Card className="card-highlight">
						<Card.Body>
							<Link to="/groceries" className="link" >
									<img className="card-img-top" src={require("../images/products/lgs.jpg")} alt="Groceries"/>
							</Link>
							<Card.Title>
								<Link to="/groceries" className="link"><h5>Groceries</h5></Link>
							</Card.Title>

							<Card.Text>
								Products from our grocery store are at wholesale prices. So you are confident that you are getting the most of your spendings!
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>

				<Col xs={12} md={6}>
					<Card className="card-highlight">
						<Card.Body>
							<img className="card-img-top text-center" src={require("../images/products/steak5.jpg")} alt="steak"/>
							<Card.Title>
								<Link to="/menu" className="link"><h5>Menu</h5></Link>
							</Card.Title>
							<Card.Text>
								Dakjuk is the korean name for a porridge with chicken meat and chicken broth. But we also offer a lot of different delicious dishes!
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
			
	)

}