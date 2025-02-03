import {Card, Col, Container, Row, Form,Button,Alert} from 'react-bootstrap';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login()
{
    const [cookies, setCookies] = useCookies(['token']);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const SubmitLogin = (event) => {
        event.preventDefault();

        var email = event.target[0].value;
        var password = event.target[1].value;

        axios.post('http://localhost:3000/auth',{
            email,password
        }).then((res) =>{
            if(res.data.token!=undefined)
            {
                setCookies('token',res.data.token);
                navigate('/');
            }else{
                setMessage(res.data.message);
                setShow(true);
            }
        }).catch((error)=>console.log(error))
    }

    return(
        <Container fluid>
            <Row>
                <Col>
                    <Alert show={show} variant='danger'>
                        <Alert.Heading>Oh No!</Alert.Heading>
                        <p>
                            {message}
                        </p>
                        <hr/>
                        <div className='d-flex justify-content-end'>
                            <Button onClick={()=>setShow(false)} variant='outline-danger'>
                                Close Me
                            </Button>
                        </div>
                    </Alert>
                    <Card>
                        <Card.Body>
                            <Card.Title>Login</Card.Title>
                            <Form onSubmit={SubmitLogin}>
                                <Form.Group className='mb-3' controlId='formEmail' name='email'>
                                    <Form.Label>Email Address</Form.Label>      
                                    <Form.Control type='email' placeholder='Enter Email'/>                              
                                </Form.Group>

                                <Form.Group className='mb-3' controlId='formPassword' name='password'>
                                    <Form.Label>Password</Form.Label>      
                                    <Form.Control type='password' placeholder='Password'/>                              
                                </Form.Group>

                                <Button variant='primary' type='submit'>
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}