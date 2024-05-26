import React, { useState, useEffect } from 'react';
import './upButton.css';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const UpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 200); // Change 100 to the scroll position where you want the component to appear
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Add smooth scrolling behavior
    });
  };

  return (
    <div>
      {isVisible && (
        <a className='btn-up' onClick={scrollToTop}>
          <ArrowUpwardIcon />
        </a>
      )}
    </div>
  );
};

export default UpButton;
