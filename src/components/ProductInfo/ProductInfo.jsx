import React, { useEffect, useState, useContext } from 'react';
import './productInfo.css';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Button from '../Button/Button';
import Carousel from 'react-bootstrap/esm/Carousel';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { CartContext } from '../../context/CartContext';
import { motion } from 'framer-motion';
import AddToCartIcon from '../AddtoCartBtn.js/AddToCartBtn';

export default function ProductInfo({ id, nombre, precio, img1, img2, img3, descripcion, descuento = 0, categoria, tamanios = [], conTamanios }) {
  const [index, setIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(tamanios.length > 0 ? tamanios[0].size : null);
  const [dynamicPrice, setDynamicPrice] = useState(tamanios[0]?.price );
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const useCart = () => {
    return useContext(CartContext);
  };

  const { addItem, quantity, formatearMoneda, calcularDescuento } = useCart();

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    const sizePrice = tamanios.find((t) => t.size === size)?.price;
  
    if (sizePrice) {
      setDynamicPrice(sizePrice);
    } else {
      setDynamicPrice(precio);
    }
  };
  

  const handleOnAdd = (quantity) => {
    const productToAdd = {
      id,
      nombre,
      precio: (conTamanios ? dynamicPrice : precio),
      quantity,
      img1,
      descuento,
      size: selectedSize,
    };
    addItem(productToAdd);
  };

  const nuevoPrecio = calcularDescuento(dynamicPrice, descuento);

  return (
    <>
      <div className='productInfoContainer'>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeInOut', type: 'spring', delay: 0.6 }}
          className="information">
          <h2>{nombre}</h2>
          <p>{descripcion}</p>

          {tamanios.length > 0 && (
            <div className="sizeSelector">
              <h5>Seleccione un tamaño:</h5>
              <select className='select' value={selectedSize} onChange={(e) => handleSizeChange(e.target.value)}>
                {tamanios.map((t, index) => (
                  <option key={index} value={t.size}>
                    {t.size} 
                  </option>
                ))}
              </select>
            </div>
          )}

          {descuento !== 0 && (
            <div className="priceAddto">
              <h5>
                Precio: <span className="price">{formatearMoneda((conTamanios ? dynamicPrice : precio))}</span>
                <span className="discountedPrice">{nuevoPrecio}</span>
              </h5>
              <AddToCartIcon onAdd={handleOnAdd} />
            </div>
          )}
          {descuento === 0 && (
            <div className="priceAddto">
              <h5>Precio: {formatearMoneda((conTamanios ? dynamicPrice : precio))}</h5>
              <AddToCartIcon onAdd={handleOnAdd} />
            </div>
          )}

          <h5>Categoría: {categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h5>
          <div className="infoPayment">
            <h5>Métodos de Pago:</h5>
            <div className="paymentMethods">
              <div className="paymentItem"><CreditCardIcon /><span>Débito</span></div>
              <div className="paymentItem"><AccountBalanceIcon /><span>Transf. Bancaria</span></div>
              <div className="paymentItem"><LocalAtmIcon /><span>Efectivo</span></div>
            </div>
          </div>
          <div className="envios"><h5>Envíos a Todo el País </h5><LocalShippingIcon /></div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.6, type: 'tween' }}>
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
  );
}
