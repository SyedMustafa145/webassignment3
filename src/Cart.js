import React, { useEffect,useState } from 'react'
import { Row,Col, Container, Button } from 'react-bootstrap'
import { toast,ToastContainer } from 'react-toastify'
import "./cart.css"
const Cart = () => {


    const [cartItems , setCartItems] = useState(null)
    const [total , setTotal] = useState(0)

    useEffect(() => {

       const Items =  localStorage.getItem("CartItems") 

        if(Items && Items.length > 0){
            setCartItems(JSON.parse(Items))
        }
        else{
            toast.error("No items in cart")
        }

       Items && Items.length > 0 && setTotal(JSON.parse(Items).reduce((acc , item) => acc + item.price , 0))


    },[])


    const RemoveItem = (id) => {
        const newItems = cartItems.filter((item) => item._id !== id)
        setCartItems(newItems)
        localStorage.setItem("CartItems" , JSON.stringify(newItems))
        setTotal(newItems.reduce((acc , item) => acc + item.price , 0))
    }


    const Checkout = () => {
        toast.success("Checkout")
        localStorage.removeItem("CartItems")
        setCartItems(null)
        setTotal(0)
    }


   const  navigatee = () => {
        window.location.href = "http://localhost:3000/";
    }


  return (
    <>

<Container style={{ marginRight:"2rem",marginLeft:"2rem", borderRadius:"1%" }} >
            <Row style={{marginTop:"2rem"}} >
                <Col sm={12} md={8} className="text-center" >  
                        
                {cartItems && cartItems.map((item)=>{
                     return(
                            <>
                            <Row key={item._id} style={{padding:"1rem"}} >
                                <Col sm={12} md={4} className="d-flex align-items-center"> 
                                <div className="image-container" >
                                    <img src={item.images[0]} />
                                </div>
                                </Col>
                                <Col sm={12} md={8} className="text-start" >
                                        <h2>{item.title}</h2>
                                      <p>{item.description}</p>
                                        <h4>{item.price}</h4>
                                        <Button onClick={() => RemoveItem(item._id)} variant="danger">Remove</Button>
                                </Col>
                            </Row>
                            <hr/>
                            </>
                            )
                            })}
                            
                       
                </Col>

                <Col sm={12} md={4} className="text-center"  >
                    
                <div style={{outline: "2px solid red"}} className="article-card">
                    <h2>Order Summary</h2>
                    <p style={{marginTop:"1rem"}} className='card-desc'>Subtotal : ${total} </p>
                    <p className='card-author'>est. Shipping : $6.49</p>
                    <h5 style={{marginTop:"5px"}} className="card-title">Total : ${total + 6.49} </h5>
                    <Button onClick={Checkout} style={{marginTop:"1rem"}} variant="primary">Checkout</Button>
                    
                </div>
        
                            <Button style={{marginTop:"1rem"}} onClick={navigatee} variant="primary">Continue Shopping</Button>
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

export default Cart