import { useState } from 'react';
import { Card, Button, Collapse, Container, Row } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { Document, Page } from 'react-pdf';
export default function AppNavbar(){

  const [open, setOpen] = useState(false);

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
              Video Tutorial
            </Button>
          </Card.Header>

            <Collapse in={open}>
              <Card.Body>
               {/*<ReactPlayer url="/media/videos/BNHSFCLLSMS_2.mp4" controls={true} />*/}
               <ReactPlayer url="https://youtu.be/SsKCOigxEX0" controls={true} />
              </Card.Body>
            </Collapse>

        </Card>

        <Card className="m-3">
          <Card.Header>
            
             <a href="/media/pdf/admin_manual.pdf" target="_blank">Download PDF</a>

          </Card.Header>

          <Card.Body>
              <Document file="/media/pdf/admin_manual.pdf">
                <Page pageNumber={1} />
              </Document>
          </Card.Body>
        </Card>
          
      </Row>
    </Container>

  );
}