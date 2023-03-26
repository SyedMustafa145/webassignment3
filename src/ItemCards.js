import React, { useEffect , useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import './articles.css'
import { Button } from 'react-bootstrap'

const ItemCards = () => {

    
    function ArticleCard(props){
      
        return(
                <div className="article-card">
                    <img effect="opacity" className="article-img" src={props.image} alt={props.title} ></img>
                    <h5 style={{marginTop:"5px"}} className="card-title">{props.title}</h5>
                    <p style={{marginTop:"1rem"}} className='card-desc'>{props.description}</p>
                    <p className='card-author'>Price : {props.price}  </p>
                    
                </div>
        )
    }


  

    const params = useParams()


    const [items , setItems] = useState([])

    useEffect(() => {

       
        const fettchData = async () => {
            console.log(params.title)
            if(!params.title){
                const {data} = await axios.get(`https://api.escuelajs.co/api/v1/products/`)
                console.log(data)
                setItems(data)
                
            }
            else{

                const {data} = await axios.get(`https://api.escuelajs.co/api/v1/products/?title=${params.title}`)
                    console.log(data)
                    setItems(data)
            }

        }
        fettchData()

    }, [params.title])


  return (
   
    <section className="latest-section">
            <h1 className="section-title">Welcome</h1>
            { items && (
                <div className="latest">
                    <div className="article-bar">
                        {
                            items.map((item,index)=>{
                                
                            return(
                                <Link style={{textDecoration:"none"}} to={`/ArticlePage/${item.title}`} >
                                <ArticleCard key={item.id} image={item.images[0]} price={item.price} description={item.description} title={item.title}  />
                                </Link>
                            )})
                        }
                    </div>
                </div>
            )}
        </section>
  )
}

export default ItemCards