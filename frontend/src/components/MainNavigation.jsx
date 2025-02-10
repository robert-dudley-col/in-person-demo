import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

export default function MainNavigation(){

    const [me, setMe] = useState({});
    const [cookies, setCookies] = useCookies(['token']);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:3000/users/@me',{
            headers:{
                Authorization:'Bearer '+cookies.token
            }
        }).then((res)=>{
            console.log(res.data)
            setMe(res.data);
            setLoaded(true);
        }).catch((err)=>{
            if(err.response.data.loggedIn===false){
                navigate('/login')
            }
        })
    },[cookies.token,navigate])

    if(loaded)
    {
        return(
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="#login">{me.email}</a>
                    </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}