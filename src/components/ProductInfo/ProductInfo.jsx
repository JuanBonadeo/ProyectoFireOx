import React from 'react'
import { useEffect, useState, useContext } from 'react'
import './productInfo.css'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Button from '../Button/Button';
import Carousel from 'react-bootstrap/esm/Carousel'
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { CartContext } from '../../context/CartContext';
import { motion } from 'framer-motion';
import AddToCartIcon from '../AddtoCartBtn.js/AddToCartBtn';
import ColorPicker from '../ColorPicker/ColorPicker';



export default function ProductInfo({ id, nombre, precio, img1, img2, img3, descripcion, descuento = 0, categoria }) {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const useCart = () => {
    return useContext(CartContext)
  }

  const { addItem, quantity, formatearMoneda, calcularDescuento } = useCart();
  const handleOnAdd = (quantity) => {
    const productToAdd = {
      id, nombre, precio, quantity, img1, descuento, 
    }
    addItem(productToAdd)
  }
  const nuevoPrecio = calcularDescuento(precio, descuento)
  return (
    <>
      <div className='productInfoContainer'>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: .7, ease: "easeInOut", type: "spring", delay: .6 }}
          className="information">
          <h2>{nombre}</h2>
          <p>{descripcion}</p>

          {descuento !== 0 && (
            <div className="priceAddto">
              <h5>
                Precio: <span className="price">{formatearMoneda(precio)}</span>
                <span className="discountedPrice">{nuevoPrecio}</span>
              </h5>
              <AddToCartIcon onAdd={handleOnAdd} />
            </div>
          )}
          {descuento === 0 && (
            <div className="priceAddto">
              <h5>Precio: {formatearMoneda(precio)}</h5>
              <AddToCartIcon onAdd={handleOnAdd} />
            </div>
          )}

          <h5>Categoria: {categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h5>
          <div className="infoPayment">
            <h5>Metodos de Pago:</h5>
            <div className="paymentMethods">
              <div className="paymentItem"><CreditCardIcon /><span>Debito</span></div>
              <div className="paymentItem"><AccountBalanceIcon /><span>Transf. Bancaria</span></div>
              <div className="paymentItem"><LocalAtmIcon /><span>Efectivo</span></div>
            </div>
          </div>
          <div className="envios"><h5>Envios a Todo el Pais </h5><LocalShippingIcon /></div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.6, type: "tween" }}>
          <Carousel activeIndex={index} onSelect={handleSelect} className='carouselContainer'>
            {img1 && (
              <Carousel.Item interval={10000}>
                <img className="infoImg" src={img1} alt="Product" />
              </Carousel.Item>
            )}
            {img2 && (
              <Carousel.Item interval={10000}>
                <img className="infoImg" src={img2} alt="Product" />
              </Carousel.Item>
            )}
            {img3 && (
              <Carousel.Item interval={10000}>
                <img className="infoImg" src={img3} alt="Product" />
              </Carousel.Item>
            )}
          </Carousel>
        </motion.div>
      </div>

    </>

  )
}
