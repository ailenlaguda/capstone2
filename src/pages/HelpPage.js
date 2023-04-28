import { useState } from 'react';
import { Card, Button, Collapse, Container, Row } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { Document, Page } from 'react-pdf';
export default function AppNavbar(){

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <Container>
      <Row className="m-3">
        <Card className="m-3">

          <Card.Header>
            <Button
              variant="button"
              onClick={() => setOpen(!open)}
              aria-controls="video-collapse"
              aria-expanded={open}
            >
              Bentuco National High School Faculty Cooperative (BNHSFC): Members Full Features Tutorial
            </Button>
          </Card.Header>

            <Collapse in={open}>
              <Card.Body>
               <ReactPlayer url="https://youtu.be/ShZpBvsri_g" controls={true} />
              </Card.Body>
            </Collapse>

        </Card>

        <Card className="m-3">

          <Card.Header>
            <Button
              variant="button"
              onClick={() => setOpen1(!open1)}
              aria-controls="video-collapse"
              aria-expanded={open1}
            >
              BNHSFC-SLMS Full Feature Tutorial for Admin
            </Button>
          </Card.Header>

            <Collapse in={open1}>
              {/*BNHSFC-SLMS Full Feature Tutorial for Admin*/}
              <Card.Body>
               <ReactPlayer url="https://youtu.be/SsKCOigxEX0" controls={true} />
              </Card.Body>
            </Collapse>

        </Card>

          
        <Card className="m-3">

          <Card.Header>
            <Button
              variant="button"
              onClick={() => setOpen2(!open2)}
              aria-controls="video-collapse"
              aria-expanded={open2}
            >
              Bentuco National High School Faculty Cooperative (BNHSFC): User Registration Via Admin Dashboard Tutorial
            </Button>
          </Card.Header>

            <Collapse in={open2}>
              <Card.Body>
               <ReactPlayer url="https://youtu.be/m2qLx5FAetk" controls={true} />
              </Card.Body>
            </Collapse>

        </Card>
          
        <Card className="m-3">
          <Card.Header>       
            Donwload User Manual
          </Card.Header>

          <Card.Body>
              
             <a href="/media/pdf/admin_manual.pdf" target="_blank">Download User Manual for Admin</a>
             <br />
             <a href="/media/pdf/user_manual.pdf" target="_blank">Download User Manual for Member</a>
          </Card.Body>
          
        </Card>
      </Row> 

    </Container>

  );
}