import React, { useEffect, useState } from 'react'
import { CartState } from '../context/Context'
import { Button, Col, FormControl, Image, ListGroup, Row } from 'react-bootstrap';
import Rating from './Rating';
import { AiFillDelete } from 'react-icons/ai';
import "./styles.css"


export default function Cart() {
    const { state: { cart }, dispatch } = CartState();

    const [total, setTotal] = useState();

    useEffect(() => {
        setTotal(cart.reduce((acc,curr)=>acc+Number(curr.price)*curr.qty,0));
    }, [cart])
    


    return (
        <div className="home">
            <div className="productContainer">
                <ListGroup>
                    {
                        cart.map(prod=>(
                            <ListGroup.Item key={prod.id}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={prod.image} alt={prod.name} fluid rounded/>
                                    </Col>
                                    <Col md={2}>
                                        <span>{prod.name}</span>
                                    </Col>
                                    <Col md={2}>
                                        Rs. {prod.price}
                                    </Col>
                                    <Col md={2}>
                                        <Rating rating={prod.ratings}></Rating>
                                    </Col>
                                    <Col md={2}>
                                        <FormControl as="select" value={prod.qty}
                                            onChange={(e)=>dispatch(
                                                {
                                                    type:"CHANGE_QTY",
                                                    payload:{
                                                        id:prod.id,
                                                        qty:e.target.value
                                                    }
                                                }
                                            )}
                                        >
                                            {
                                                [...Array(prod.instock[0]).keys()].map((x)=>(
                                                    <option keys={x+1}>{x+1}</option>
                                                    ))
                                                }
                                        </FormControl>
                                    </Col>
                                    <Col md={2}>
                                        <Button type='button' variant='light'
                                            onClick={()=>
                                                dispatch({
                                                    type:"REMOVE_FROM_CART",
                                                    payload:prod,
                                            })
                                            }
                                        >
                                            <AiFillDelete fontSize="20px"/>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </div>
            <div className="filters summary">
                <span className='title'>Subtotal ({cart.length}) items </span>
                <span style={{fontWeight: 700 , fontSize: 20}}> Total: Rs. {total}</span>
                <Button type='button' disabled={cart.length===0}>
                    Proceed to Checkout
                </Button>
            </div>
        </div>
  )
}
