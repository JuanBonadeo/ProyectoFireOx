import React from 'react'
import './GraciasXtuCompra.css'
import Button from '../Button/Button'
export const GraciasXtuCompra = () => {
    return (
        <div className='graciaContainer'>
            <h1>Muchas gracias por tu compra!!</h1>
            <h2>En breve nos pondremos en contacto.</h2>
            <p></p>
            <Button to='/productos' label='Volver'/>
        </div>
    )
}
