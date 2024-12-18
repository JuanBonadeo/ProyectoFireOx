import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css'
import { CartContext } from '../../context/CartContext';

import AddToCartIcon from '../AddtoCartIcon.js/AddToCartIcon';


export default function ProductCard({nombre,img1,precio,id, descuento = 0, stock, tamanios, conTamanios}) {
  const useCart = () => {
    return useContext(CartContext)
  }
  let size = 0
  if(conTamanios){
    precio = tamanios[0].price
    size = tamanios[0].size
  }
  
  const { addItem, quantity, formatearMoneda, calcularDescuento} = useCart();
  const handleOnAdd = (quantity) => {
    const productToAdd = {
        id, nombre, precio, quantity, img1, descuento, stock, tamanios, size
    }
    addItem(productToAdd)
  } 
  if(descuento !== 0) {
    const nuevoPrecio = calcularDescuento(precio, descuento)
    return (
      <div className='productCardContainer'>
        <Link to={`/producto/${id}`} className='img'>
          <div className='discountBadge'> -{descuento}%</div>
          <img src={img1} alt={`${nombre}`} loading='lazy' className='imgProduct'/>
        </Link>
        <div className="cardInfo">
          <div className="namePrice">
            <h4>{nombre}</h4>
            <div className="prices">
              <span className='price'>{formatearMoneda(precio)}</span>
              <span className='discountedPrice'>{nuevoPrecio}</span>
            </div>
          </div>
          
          <AddToCartIcon onAdd={handleOnAdd}/>
        </div>
        
      </div>
    )
  }
  if(!stock){
  return (
    <div className='productCardContainer'>
      <Link to={`/producto/${id}`} className='img'>
      <img src={img1} alt={`${nombre}`} loading='lazy' className='imgProduct outOfStock'/>
      </Link>
      <div className="cardInfo">
        <div className="namePrice">
          <h4>{nombre}</h4>
          <span>{formatearMoneda(precio)}</span>
        </div>
        <AddToCartIcon onAdd={handleOnAdd}/>
      </div>
      <span className='outOfStockBadge'>Sin Stock</span>
    </div>
  )
} 
return (
  <div className='productCardContainer'>
    <Link to={`/producto/${id}`} className='img'>
      <img src={img1} alt={`${nombre}`} loading='lazy' className='imgProduct'/>
    </Link>
    <div className="cardInfo">
      <div className="namePrice">
        <h4>{nombre}</h4>
        <span>{formatearMoneda(precio)}</span>
      </div>
      <AddToCartIcon onAdd={handleOnAdd}/>
    </div>
  </div>
)

}
