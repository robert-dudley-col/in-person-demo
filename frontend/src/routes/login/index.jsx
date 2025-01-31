import {Card, Col, Container, Row, Form,Button,Alert} from 'react-bootstrap';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login()
{
    return(
        <Container fluid>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Login</Card.Title>
                            <Form>
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