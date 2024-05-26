import React from 'react';
import './logo.css';
import { Link } from 'react-router-dom';


const Logo = (prop) => {
  return (
      <Link to="/"><img className={prop.className} src="logo.png" alt="A la tabla logo" /></Link>
      
      

  );
};

export default Logo;
