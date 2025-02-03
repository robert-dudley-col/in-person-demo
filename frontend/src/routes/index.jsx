import {Button, Card, Col, Container, Row, Form} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie';


export default function Index()
{
    const [hotels, setHotels] = useState([]);
    const [hotelsLoaded, setHotelsLoaded] = useState(false);
    const [search, setSearch] = useState("");
    const [cookies] = useCookies(['token']);
    const [hotelSelected, setHotelSelected] = useState({});

    useEffect(()=>{
        if(search === "")
        {
            axios.get('http://localhost:3000/hotels/',{
                headers:{
                    Authorization: 'Bearer '+cookies['token']
                }
            }).then((res)=>{
                setHotelsLoaded(true)
                setHotels(res.data.hotels)
                setHotelSelected(res.data.hotels[0])
            })
        }
    },[search])

    const HotelSelected = (event) =>{
        setHotelSelected(hotels[event.target.selectedIndex])
    }


    if(hotelsLoaded)
    {
        return(
            <Container>
                <Row>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Hotel</Card.Title>
                                <Card.Text style={{textAlign:'center'}}>
                                    <Form>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Search For Hotel</Form.Label>
                                            <Form.Control />
                                        </Form.Group>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Select Hotel</Form.Label>
                                            <Form.Select onChange={HotelSelected}>
                                                {
                                                    hotels.map((hotel)=>(
                                                        <option id={hotel._id} key={hotel._id}>{hotel.location}</option>
                                                    ))
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                    </Form>
    
                                    <Card>
                                        <Card.Img variant='top' src={hotelSelected.img}/>
                                        <Card.Body>
                                            <Card.Title>{hotelSelected.location}</Card.Title>
                                            <Card.Text>{hotelSelected.description}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={8}>
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
}