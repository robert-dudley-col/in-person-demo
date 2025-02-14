import {Button, Card, Col, Container, Row, Form, InputGroup} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import MainNavigation from '../components/MainNavigation';
import { useNavigate } from 'react-router-dom';


export default function Index()
{
    const [hotels, setHotels] = useState([]);
    const [hotelsLoaded, setHotelsLoaded] = useState(false);
    const [search, setSearch] = useState("");
    const [cookies] = useCookies(['token']);
    const [hotelSelected, setHotelSelected] = useState({});

    const [single, setSingle] = useState(0);
    const [twin, setTwin] = useState(0);
    const [double, setDouble] = useState(0);
    const [family, setFamily] = useState(0);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:3000/hotels?search='+search,{
            headers:{
                Authorization: 'Bearer '+cookies['token']
            }
        }).then((res)=>{
            setHotelsLoaded(true)
            setHotels(res.data.hotels)
            setHotelSelected(res.data.hotels[0])
        })
    },[search])

    const HotelSelected = (event) =>{
        setHotelSelected(hotels[event.target.selectedIndex])
    }

    const updateSearch = (event) =>{
        console.log(event.target.value);
        setSearch(event.target.value);
    }

    const BookRooms = (event) =>{
        event.preventDefault();
        var checkindate = event.target[0].value;
        var checkoutdate = event.target[1].value;

        axios.post('http://localhost:3000/bookings',{
            checkin:checkindate,
            checkout:checkoutdate,
            single:single,
            twin:twin,
            double:double,
            family:family,
            hotel:hotelSelected._id
        },{
            headers:{
                Authorization: 'Bearer '+cookies['token']
            }
        }).then((res)=>{
            navigate('/bookings/'+res.data.booking)
        })
    }


    if(hotelsLoaded)
    {
        return(
            <Container>
                <MainNavigation/>
                <Row>
                    <Col md={4}>
                        <Row className='mb-3'>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Hotel</Card.Title>
                                    <Card.Text style={{textAlign:'center'}}>
                                        <Form>
                                            <Form.Group className='mb-3'>
                                                <Form.Label>Search For Hotel</Form.Label>
                                                <Form.Control onChange={updateSearch} type='text' placeholder='Enter Search Term'/>
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
                        </Row>
                        <Row className='mb-3'>
                            <Card >
                                <Card.Body>
                                    <Card.Title>Dates</Card.Title>
                                    <Card.Text style={{textAlign:'center'}}>
                                        <Form onSubmit={BookRooms}>
                                            <Form.Group className='mb-3'>
                                                <Form.Label>Check in Date</Form.Label>
                                                <Form.Control type='date'/>
                                            </Form.Group>
                                            <Form.Group className='mb-3'>
                                                <Form.Label>Check out Date</Form.Label>
                                                <Form.Control type='date'/>
                                            </Form.Group>
                                            <Button type='submit'>
                                                Submit
                                            </Button>
                                        </Form>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Col>
                    <Col md={8}>
                    <Card>
                            <Card.Body>
                                <Card.Title>Rooms</Card.Title>
                                <Card className="mb-3">
                                    <Card.Body>
                                        <Row>
                                            <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
                                                <Card.Img src="https://a36c2e13a78ae1256a2f-1dc878dead8ec78a84e429cdf4c9df00.ssl.cf1.rackcdn.com/u/park-hotel-hong-kong/room/Superior-Single-Room_mid.jpg" />
                                            </Col>
                                            <Col>
                                                <Card.Title>Single Room</Card.Title>
                                                <Card.Text>
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea alias aliquid, iusto iure doloribus tenetur error perferendis, debitis, fugiat rerum at laboriosam a? Vero itaque inventore quisquam ut dolore officia unde placeat sint, odio eum nam veritatis consectetur obcaecati doloribus, repellat consequatur aut, odit blanditiis molestias quae quo?
                                                </Card.Text>
                                                <Form>
                                                    <Form.Group controlId="formNumberInput">
                                                        <Form.Label>Number of Rooms Required</Form.Label>
                                                        <InputGroup>
                                                            <Button variant="outline-secondary" onClick={()=>setSingle(single-1)}>-</Button>
                                                            <Form.Control
                                                                type="number"
                                                                value={single}
                                                                min={0}
                                                            />
                                                            <Button variant="outline-secondary" onClick={()=>setSingle(single+1)}>+</Button>
                                                        </InputGroup>
                                                    </Form.Group>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>

                                <Card className="mb-3">
                                    <Card.Body>
                                        <Row>
                                            <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                                <Card.Img src="https://www.alphahoteleasterncreek.com.au/wp-content/uploads/2018/01/Alpha-Hotel-Eastern-Creekn-Twin-Hotel-Room-min.jpg" />
                                            </Col>
                                            <Col>
                                                <Card.Title>Twin Room</Card.Title>
                                                <Card.Text>
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, maxime amet accusantium eligendi deleniti blanditiis eum, impedit velit reiciendis ad, nemo est nesciunt officiis. Vel cum facilis soluta sed recusandae.
                                                </Card.Text>
                                                <Form>
                                                    <Form.Group controlId="formNumberInput">
                                                        <Form.Label>Number of Rooms Required</Form.Label>
                                                        <InputGroup>
                                                            <Button variant="outline-secondary" onClick={()=>setTwin(twin-1)}>-</Button>
                                                            <Form.Control
                                                                type="number"
                                                                value={twin}
                                                                min={0}
                                                            />
                                                            <Button variant="outline-secondary"onClick={()=>setTwin(twin+1)}>+</Button>
                                                        </InputGroup>
                                                    </Form.Group>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>

                                <Card className="mb-3">
                                    <Card.Body>
                                        <Row>
                                            <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                                <Card.Img src="https://cdn.traveltripper.io/site-assets/512_855_12327/media/2018-02-27-075849/large_superior-double-2.jpg" />
                                            </Col>
                                            <Col>
                                                <Card.Title>Double Room</Card.Title>
                                                <Card.Text>
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam consequuntur obcaecati dignissimos omnis, maxime vel architecto veritatis placeat, pariatur rem tempore dolorum nisi eum ipsa necessitatibus ratione doloribus cupiditate fugiat harum, adipisci quos veniam at iste repudiandae. Alias quo, corporis esse laborum dolore blanditiis numquam dignissimos. Dignissimos facere temporibus nostrum?
                                                </Card.Text>
                                                <Form>
                                                    <Form.Group controlId="formNumberInput">
                                                        <Form.Label>Number of Rooms Required</Form.Label>
                                                        <InputGroup>
                                                            <Button variant="outline-secondary" onClick={()=>setDouble(double-1)}>-</Button>
                                                            <Form.Control
                                                                type="number"
                                                                value={double}
                                                                min={0}
                                                            />
                                                            <Button variant="outline-secondary" onClick={()=>setDouble(double+1)}>+</Button>
                                                        </InputGroup>
                                                    </Form.Group>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>

                                <Card className="mb-3">
                                    <Card.Body>
                                        <Row>
                                            <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                                <Card.Img src="https://www.hillgrovehotel.com/wp-content/uploads/2023/07/Family-Room-Bunk-Beds-Accessories-scaled.jpg" />
                                            </Col>
                                            <Col>
                                                <Card.Title>Family Room</Card.Title>
                                                <Card.Text>
                                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore minima iure quam alias assumenda laboriosam eveniet odio ipsam ut ipsum, eligendi dicta? Quod beatae rem numquam adipisci expedita reprehenderit modi hic animi nobis?
                                                </Card.Text>
                                                <Form>
                                                    <Form.Group controlId="formNumberInput">
                                                        <Form.Label>Number of Rooms Required</Form.Label>
                                                        <InputGroup>
                                                            <Button variant="outline-secondary" onClick={()=>setFamily(family-1)}>-</Button>
                                                            <Form.Control
                                                                type="number"
                                                                value={family}
                                                                min={0}
                                                            />
                                                            <Button variant="outline-secondary" onClick={()=>setFamily(family+1)}>+</Button>
                                                        </InputGroup>
                                                    </Form.Group>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}