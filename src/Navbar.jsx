import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './Navbar.css';


function Navbarr() {

    const navigate = useNavigate()

    const [search, setSearch] = useState('')

    const handleClick = () => {
        navigate(`/${search}`)
    }


    const [cartlength, setCart] = useState(0)

    useEffect(() => {
        const cart = localStorage.getItem('CartItems')
        if (cart) {
            setCart(JSON.parse(cart).length)
        }


         if (cart) {
             const cartItems = JSON.parse(cart)
            const cartItemsTitle = cartItems.map((item) => item.title)
            const unique = [...new Set(cartItemsTitle)]
            setCart(unique.length)
         }

    }, [])



  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Ecommerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            
             
            <Nav.Link href="/cart">Cart<FaShoppingCart className="cart-icon" /> <span className="cart-count">{cartlength}</span></Nav.Link>
           
          </Nav>


          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Button onClick={handleClick} variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarr;