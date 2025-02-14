import { useParams } from "react-router-dom";
import MainNavigation from "../../components/MainNavigation";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";


export default function ViewBooking()
{
    let {bookingID} = useParams();
    const [booking, setBooking] = useState({});
    const [cookies] = useCookies(['token']);

    useEffect(()=>{
        axios.get('http://localhost:3000/bookings/'+bookingID,{
            headers:{
                Authorization:'Bearer '+cookies['token']
            }
        }).then((res)=>{
            setBooking(res.data)
        }).catch((error)=>{
            console.log(error)
        })
    },[]);

    if(booking._id !== undefined)
    {
        return(
            <>
                <MainNavigation/>
                <Container>
                    <Row>
                        <Col>
                            <p>{booking.hotel.location}</p>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }else{
        return(
            <>
                <MainNavigation/>
                <Container>
                    <Row>
                        <Col>
                            <p>Loading Booking</p>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
    
}