import {Button, Card, Col, Container, Row} from 'react-bootstrap';

export default function Index()
{
    return(
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Login</Card.Title>
                            <Card.Text style={{textAlign:'center'}}>
                                <Button href='/login'>Login</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Register</Card.Title>
                            <Card.Text style={{textAlign:'center'}}>
                                <Button href='/register'>Register</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
    
}