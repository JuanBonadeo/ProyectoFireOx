import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../Button/Button';
import '../Hero2/hero2.css';

export const Hero2 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.5, // trigger when 10% of the element is visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      className="CombosContainer"
      initial={{ y: 500, scale: 0 }}
      animate={isVisible && { y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, type: 'spring' }}
      ref={containerRef}
    >
      <img
        src="https://firebasestorage.googleapis.com/v0/b/fireox-eb715.appspot.com/o/banner.jpeg?alt=media&token=48abfdce-de9b-414b-a875-5c686ea3991c"
        alt="Combos"
        className="combosImg"
      />
      <div className="info">
        <h2>Combos de Tablas y Chuchillos</h2>
        <p>
          Encarga ya tu tabla de picadas y cuchillos personalizados para regalar o
          regalarte.
        </p>
        <Button label="Encargar" to="/tablas&cuchilos" />
      </div>
    </motion.div>
  );
};
