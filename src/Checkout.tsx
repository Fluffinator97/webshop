import React, { useContext } from 'react'
import { CartContext } from '../src/context/cartContext';

export default function Checkout() {
    const [cartItems, setCart] = useContext(CartContext)
    const totalPrice = cartItems.reduce((acc: number, curr: { price: number; }) => acc + curr.price, 0)
    console.log(cartItems)
    return (
        <div>
        <p>
            
            {cartItems.map((item: { id: React.ReactNode; price: React.ReactNode; quantity:React.ReactNode}) => 
            (<h6>{item.id} - {item.price} -- {item.quantity}</h6>))}
        </p>
        <p>Total = {totalPrice}</p>
        </div>
    )
}
