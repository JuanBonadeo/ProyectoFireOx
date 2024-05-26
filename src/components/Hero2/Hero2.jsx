import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { motion, spring } from 'framer-motion';
import Button from '../Button/Button';
import '../Hero2/hero2.css';

 export const Hero2 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ContainerRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const topOffset = ContainerRef.current.offsetTop;
      const bottomOffset = topOffset + ContainerRef.current.offsetHeight;

      const scrollPosition = window.scrollY + window.innerHeight;

      if (scrollPosition > topOffset && scrollPosition < bottomOffset) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <motion.div
      className="CombosContainer"
      initial={{ y: 500, scale: 0 }} animate={isVisible && { y: 0, scale: 1 }} 
          transition={{ duration: 1, delay: .3, type: "spring" }} ref={ContainerRef}
    >
      <img
        src='https://firebasestorage.googleapis.com/v0/b/fireox-eb715.appspot.com/o/banner.jpeg?alt=media&token=48abfdce-de9b-414b-a875-5c686ea3991c'
        alt='Combos'
        className='combosImg'
      />
      <div className="info">
        <h2>Combos de Tablas y Chuchillos</h2>
        <p>
          Encarga ya tu tabla de picadas y cuchillos personalizados para regalar o
          regalarte.
        </p>
        <Button label='Encargar' to='/tablas&cuchilos' />
      </div>
    </motion.div>
  );
};




