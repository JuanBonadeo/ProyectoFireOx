import React from 'react';
import { motion, spring } from 'framer-motion';
import Button from '../Button/Button';
import { useEffect, useRef, useState } from 'react';


export const Hero3 = () => {
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
      className="CombosContainer margintop"
      initial={{ y: 500, scale: 0 }} animate={isVisible && { y: 0, scale: 1 }} 
          transition={{ duration: 1, delay: .3, type: "spring" }} ref={ContainerRef}
    >
      <div className="info">
        <h2>Planchetas para una y dos hornallas</h2>
        <p>
          Planchetas de acero inoxidable, de primera calidad, con un espesor de 3mm. Ideales para cocinar en el hogar, en la parrilla o en el camping.
        </p>
        <Button label='Encargar' to='/ollas' />
      </div>
      <img
        src='https://firebasestorage.googleapis.com/v0/b/fireox-eb715.appspot.com/o/banne2..jpeg?alt=media&token=329ac7f7-97a7-412c-b96d-a4e2d3e92941'
        alt='Combos'
        className='combosImg'
      />
    </motion.div>
  );
};




