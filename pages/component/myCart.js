import React from 'react'

export default function myCart() {
    const [cart,setCart] = useState([])
    const getCart =()=> {
        let myCart = localStorage.setItem('myCart')
    }
    return (
        <div>
            <h1>My Cart</h1>
        </div>
    )
}
