import React, { useEffect ,useState} from 'react'
import { Container, Row,Col, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Carousel from 'react-bootstrap/Carousel';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const ArticlePage = () => {


    const params = useParams()
    const [item , setItem] = useState(null)


    const AddToCart = () => {
        toast.success("Added to cart")

        const cartItems = localStorage.getItem("CartItems") ? JSON.parse(localStorage.getItem("CartItems")) : []

        cartItems.push(item)

        localStorage.setItem("CartItems" , JSON.stringify(cartItems))
    }

    useEffect (() => {

        const fetchData = async () => {
            const {data} = await axios.get(`https://api.escuelajs.co/api/v1/products/?title=${params.title}`)
            console.log(data)
            setItem(data[0])
        }
        fetchData()
    },[])


if(!item) return (<h1>Loading...</h1>)

  return (
     <>
        <Container style={{marginTop:"2rem"}} >
        <h1>Article Page</h1>

        <Row>
            <Col sm={12} md= {5} >
            <Carousel>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src={item.images[0]}
          alt="First slide"
        />
        
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          className="d-block w-100"
          src={item.images[1]}
          alt="Second slide"
        />
       
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={item.images[2]}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
            </Col>
            <Col sm={12} md= {7} >
                <h2 style={{color:"red"}} >{item.title}</h2>
                <p style={{color:"red" , marginTop:"1rem"}} >{item.description}</p>
                <h4 style={{color:"red", margin:"1rem" } } >${item.price}</h4>
                
                <Button onClick={AddToCart} variant="primary">Add to cart</Button>
            </Col>

        </Row>

        </Container>

        <ToastContainer 
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
      

     </>
    )
}

export default ArticlePage