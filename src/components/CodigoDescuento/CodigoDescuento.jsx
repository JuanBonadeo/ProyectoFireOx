import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext'
import  Button  from '../Button/Button';
import Swal from 'sweetalert2';
import { Toast } from '../../context/CartContext';
import './CodigoDescuento.css';

const CodigoDescuento = () => {
    const [code, setCode] = useState('');

    const useCart = () => {
        return useContext(CartContext)
    }
    let { setDescuentoCodigo, descuentoCodigo} = useCart();
    
    const handleCode = (e) => {
        const code = document.getElementById('code').value;
        setCode(code);
    }

    const handleSubmit = () => {
        if (code == 'cbt24') { 
            Toast.fire({
                icon: 'success',
                title: 'Código Correcto ¡10% de Descuento!'
            });
            setDescuentoCodigo(0.1);
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Código Incorrecto'
            });
            setDescuentoCodigo(0);
        }
    }
    
    return (
        <>
            <div className="containerP">
                <h1>Código de Descuento</h1>
                <div className="form1">
                    <input type='text' id='code' name='code' placeholder='CODIGO DE DESCUENTO' value={code} onChange={handleCode} required />
                    <button className="Button2" onClick={handleSubmit}>Aplicar Código</button>
                    <h4>Descuento de {descuentoCodigo * 100}%</h4>
                </div>
                    
               
                
                <Button to={'/terminarcompra/'} label="Iniciar Compra"/>       


            </div>




        </>
    )
}
export default CodigoDescuento
