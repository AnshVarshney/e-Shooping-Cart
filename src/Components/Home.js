import React from 'react'
import { CartState } from '../context/Context'
import SingleComponent from './SingleComponent';
import "./styles.css"
import Filter from './Filter';

export default function Home() {

    const { state: { products }, pstate: { sort , bystock , byfastdelivery , byrating, searchQuery} } = CartState();
    const transform = () => {
        let sortprod = [...products];
        
        if (sort) {
            sortprod = sortprod.sort((a, b) =>
                sort === "lowToHigh" ? a.price - b.price : b.price - a.price
            );
        }


        if (!bystock) {
            sortprod = sortprod.filter((prod) => prod.instock[0]);
        }

        if (byfastdelivery) {
            sortprod = sortprod.filter((prod) => prod.fastDelivery);
        }

        if(byrating)
        {
            sortprod=sortprod.filter((prod)=>(prod.ratings>=byrating));
        }

        if(searchQuery)
        {
            sortprod=sortprod.filter((prod)=>
            prod.name.toLowerCase().includes(searchQuery));
        }        
        return sortprod;
    }   

    return (
        <div className="home">
            <Filter />
            <div className="productContainer">
                {
                    transform().map((prod) => {
                        return <SingleComponent prod={prod} key={prod.id} />
                    })
                }
            </div>
        </div>
    )
}
