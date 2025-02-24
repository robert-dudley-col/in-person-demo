import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import MainNavigation from "../../components/MainNavigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

export default function BookingsAtHotel()
{
    const [cookies] = useCookies(['token']);
    const [bookings, setBookings] = useState([]);
    const {id} = useParams();

    useEffect(()=>{
        axios.get('http://localhost:3000/bookings/hotel/'+id,{
            headers:{
                Authorization:'Bearer '+cookies['token']
            }
        }).then((res)=>{
            setBookings(res.data)
        }).catch((err)=>console.log(err))
    },[cookies])

    if(bookings.length>=1)
    {
        return(
            <>
                <MainNavigation/>
                <Container>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Your Bookings</Card.Title>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Location</th>
                                                <th>Check in date</th>
                                                <th>Check out date</th>
                                                <th>View</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                bookings.map((booking)=>(
                                                    <tr key={booking._id}>
                                                        <td>{booking.hotel.location}</td>
                                                        <td>{booking.checkin}</td>
                                                        <td>{booking.checkout}</td>
                                                        <td><Button href={'/bookings/'+booking._id}>View Booking</Button></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}