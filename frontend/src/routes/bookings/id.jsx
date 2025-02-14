import { useParams } from "react-router-dom";
import MainNavigation from "../../components/MainNavigation";
import { Col, Container, Row } from "react-bootstrap";


export default function ViewBooking()
{
    let {bookingID} = useParams();

    return(
        <>
            <MainNavigation/>
            <Container>
                <Row>
                    <Col>
                        <p>{bookingID}</p>

                        
                    
                    </Col>
                </Row>
            </Container>
        </>
    )
}