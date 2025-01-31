import {Card, Col, Container, Row, Form,Button,Alert} from 'react-bootstrap';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register()
{
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const SubmitRegister = (event) =>{
        event.preventDefault();
        var email = event.target[0].value;
        var password = event.target[1].value;
        var passwordRepeat = event.target[2].value;

        if(password == passwordRepeat)
        {
            axios.post('http://localhost:3000/users',{
                email,password
            }).then((res)=>{
                navigate('/login')
            }).catch((error) =>{
                setShow(true);
                setMessage(error.error.data.message)
            })
        }else{
            setShow(true);
            setMessage("Passwords do not match");
        }
    }

    return(
        <Container fluid>
            <Row>
                <Col>

                    <Alert show={show} variant='danger'>
                        <Alert.Heading>Warning</Alert.Heading>
                        <p>
                            {message}
                        </p>
                        <hr/>
                        <div className='d-flex justify-content-end'>
                            <Button onClick={()=>setShow(false)} variant='danger'>
                                Close Me
                            </Button>
                        </div>
                    </Alert>

                    <Card>
                        <Card.Body>
                            <Card.Title>Register</Card.Title>
                            <Form onSubmit={SubmitRegister}>
                                <Form.Group className='mb-3' controlId='formEmail' name='email'>
                                    <Form.Label>Email Address</Form.Label>      
                                    <Form.Control type='email' placeholder='Enter Email'/>                              
                                </Form.Group>

                                <Form.Group className='mb-3' controlId='formPassword' name='password'>
                                    <Form.Label>Password</Form.Label>      
                                    <Form.Control type='password' placeholder='Password'/>                              
                                </Form.Group>

                                <Form.Group className='mb-3' controlId='formPasswordRepeat' name='passwordRepeat'>
                                    <Form.Label>Repeat Password</Form.Label>      
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