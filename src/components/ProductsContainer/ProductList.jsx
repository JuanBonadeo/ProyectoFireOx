import ProductCard from "../ProductCard/ProductCard";
import UpButton from "../UpButton/UpButton";
import './productsContainer.css'
import { motion } from "framer-motion";
import React from 'react'


export default function ProductList({ products, orderBy}) {
let filteredProducts = [...products];   
if (orderBy === "precioAsc") {
    filteredProducts.sort((a, b) => (a.precio > b.precio) ? 1 : -1);
} else if (orderBy === "precioDesc") {
    filteredProducts.sort((a, b) => (a.precio < b.precio) ? 1 : -1);
} 
  return (
    <>
    <div className='productsContainer'>
        

        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 2, delay: 0.6, type: "spring", ease: "easeInOut", stiffness: "100", damping: "10", mass: "1.0"}}
        className="ProductList">
          {filteredProducts.map(product => <ProductCard key={product.id} {...product}/>)}
        </motion.div>
    </div> 
    <UpButton/>
</>
  )
}
