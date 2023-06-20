import { createContext, useContext, useReducer } from "react";
import { faker } from '@faker-js/faker';
import Reducer , {pReducer} from "./Reducer";

const Cart = createContext(); 
faker.seed(99);


export default function Context({children}) {
    
    const products = [...Array(20)].map(()=>({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image:faker.image.urlPicsumPhotos(),
        instock: faker.helpers.arrayElements([0,3,5,6,7],1),
        fastDelivery: faker.datatype.boolean(),
        ratings : faker.helpers.arrayElements([1,2,3,4,5],1),
    }));


    // console.log(products);

    const [state,dispatch] = useReducer(Reducer,{
        products:products,
        cart:[],
    });

    const [pstate, pdispatch] = useReducer(pReducer,{
        bystock:false,
        byfastdelivery:false,
        byrating:0,
        searchQuery:""
    });

    return (
    <Cart.Provider value={{state,dispatch,pstate,pdispatch}}>
        {children}
    </Cart.Provider>
  )
}

export const CartState = ()=>{
    return useContext(Cart);
};


