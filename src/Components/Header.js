import React from 'react'
import { Badge, Button, Container, Dropdown, FormControl, Nav, Navbar } from 'react-bootstrap'
import {FaShoppingCart} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { CartState } from '../context/Context'
import { AiFillDelete } from 'react-icons/ai'
import "./styles.css"


export default function Header() {

  const{
    state:{cart},
    dispatch,
    pstate:{bystock},
    pdispatch,
  } = CartState();

  return (
    <Navbar bg='dark' variant='dark' style={{height: 80}}>
        <Container>
            <Navbar.Brand>
                <Link to="/">E-Shopping Cart</Link>
            </Navbar.Brand>
            <Navbar.Text className='search'>
                <FormControl onChange={(e)=>
                    pdispatch({
                        type:"SEARCH_QUERY",
                        payload: e.target.value,
                    })
                }
                checked={bystock} style={{width : 500}} placeholder='Search a Product' className='m-auto'/>
            </Navbar.Text>
            <Nav>
                <Dropdown alignright="true">
                    <Dropdown.Toggle variant="success">
                        <FaShoppingCart color="white" fontSize="25px"/>
                        <Badge className='bg-success'>{cart.length}</Badge>
                    </Dropdown.Toggle>
                    
                    <Dropdown.Menu style={{minWidth:370,left:-285}}>
                        {
                            (cart.length>0) ? (
                                <>
                                    {
                                        cart.map((prod)=>(
                                            <span className='cartItem ' key={prod.id} >
                                                <img
                                                    src={prod.image}
                                                    className='cartItemImg'
                                                    alt={prod.name}
                                                />
                                                <div className="cartItemDetail">
                                                    <span>{prod.name}</span>
                                                    <span>Rs. {prod.price.split(".")[0]}</span>
                                                </div>
                                                <AiFillDelete
                                                    fontSize="20px"
                                                    style={{cursor : "pointer"}}
                                                    onClick={()=>{
                                                        dispatch({
                                                            type:"REMOVE_FROM_CART",
                                                            payload: prod,
                                                        })
                                                    }}
                                                /> 
                                            </span>
                                        ))
                                    }
                                    <Link to="/cart">
                                        <Button style={{width : "95%" , margin: " 0 10px"}}>
                                            Go to Cart
                                        </Button>
                                    </Link>
                                </>
                            ) : (<span style={{padding:10}}>Cart is Empty!</span>)
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>
        </Container>
    </Navbar>
  )
}
