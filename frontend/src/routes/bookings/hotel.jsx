import { useEffect, useState } from "react";
import MainNavigation from "../../components/MainNavigation";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function BookingsHotels()
{
    const [hotels, setHotels] = useState([]);
    const [cookies] = useCookies(['token']);

    useEffect(()=>{
        axios.get('http://localhost:3000/hotels?search=',{
            headers:{
                Authorization:'Bearer '+cookies['token']
            }
        }).then((res)=>{
            setHotels(res.data.hotels)
            console.log(res.data)
        })
    },[cookies])

    if(hotels.length>0)
    {
        return(
            <>
                <MainNavigation/>
                <Container>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Title>Select a hotel</Card.Title>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Location</th>
                                            <th>Description</th>
                                            <th>Select</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            hotels.map((hotel)=>(
                                                <tr key={hotel._id}>
                                                    <td>{hotel.location}</td>
                                                    <td>{hotel.description}</td>
                                                    <td><Button href={'/bookings/hotel/'+hotel._id}>View Bookings</Button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }else{
        return(
            <p>Loading....</p>
        )
        
    }
}