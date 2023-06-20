import React from 'react'
import { Button, Form } from 'react-bootstrap'
import Rating from './Rating';
import "./styles.css"
import { CartState } from '../context/Context';


export default function Filter() {

    const {
        pstate: { bystock, byfastdelivery, byrating, sort},
        pdispatch
    } = CartState();

    // console.log(bystock, byfastdelivery, byrating, sort, searchQuery);

    return (
        <div className="filters">
            <span className='title'>Filter Product</span>
            <span>
                <Form.Check
                    inline
                    label="Ascending"
                    name="group1"
                    type="radio"
                    id={`inline-1`}
                    onChange={() =>
                        pdispatch({
                            type: "SORT_BY_PRICE",
                            payload: "lowToHigh"
                        })
                    }
                    checked={sort === "lowToHigh" ? true : false}
                />
            </span>
            <span>
                <Form.Check
                    inline
                    label="Descending"
                    name="group1"
                    type="radio"
                    id={`inline-2`}
                    onChange={() =>
                        pdispatch({
                            type: "SORT_BY_PRICE",
                            payload: "highToLow"
                        })
                    }
                    checked={sort === "highToLow" ? true : false}
                />
            </span>
            <span>
                <Form.Check
                    inline
                    label="Include Out of Stock"
                    name="group1"
                    type="checkbox"
                    id={`inline-3`}
                    onChange={() =>
                        pdispatch({
                            type: "FILTER_BY_STOCK"
                        })
                    }
                    checked={bystock}
                />
            </span>
            <span>
                <Form.Check
                    inline
                    label="Fast Delivery Only"
                    name="group1"
                    type="checkbox"
                    id={`inline-4`}
                    onChange={() =>
                        pdispatch({
                            type: "FILTER_BY_DELIVERY"
                        })
                    }
                    checked={byfastdelivery}
                />
            </span>
            <span>
                <label style={{ paddingRight: 10 }}></label>
                <Rating rating={byrating} onClick={(i) =>
                    pdispatch({
                        type: "FILTER_BY_RATING",
                        payload: i
                    })
                } style={{ cursor: "pointer" }} />
            </span>
            <Button variant='light' onClick={() =>
                pdispatch({
                    type: "CLEAR_FILTER"
                })
            }>Clear Filter</Button>
        </div>
    )
}
