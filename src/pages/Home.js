import React from 'react';
import Banner from '../components/Banner';
import Highlights from '../components/Highlights';
import	{Container, Row, Col} from "react-bootstrap";

export default function Home(){

	return(
		<Container>
			<Row>
				<Col xs={{ span: 12, order: 2 }} md={{ span: 6, order: 1 }}><Highlights /></Col>
				<Col xs={{ span: 12, order: 1 }} md={{ span: 6, order: 2 }} ><Banner /></Col>	
			</Row>
		</Container>
	)
}