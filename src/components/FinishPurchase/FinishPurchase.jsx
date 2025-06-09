import '../FinishPurchase/FinishPurchase.css';
import { useEffect, useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext'
import '../Button/button.css';
import Swal from 'sweetalert2';


const FinishPurchase = () => {
    const useCart = () => useContext(CartContext);
    const { cart, total, calcularDescuento, formatearMoneda, clearCart2, descuentoCodigo, totalSinDescuento } = useCart();

    const precioEnvio = 9000;
    const precioEnvioGratis = 30000;

    const [entrega, setEntrega] = useState('envio');
    const [pago, setPago] = useState('transferencia');
    const [totalFinal, setTotalFinal] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    
    
    const handleEntregaChange = (event) => {
        setEntrega(event.target.value);
    };
    
    const handlePagoChange = (event) => {
        setPago(event.target.value);
    };
    
    const calcularTotal = () => {
        for (const prod of cart) {
            const precioFinal = pago === 'transferencia'
                ? calcularDescuento(prod.precio * prod.quantity, prod.descuento)
                : prod.precio * prod.quantity;
            total += precioFinal;
        }
        return total;
    }
    
    
    
    
    
    const buyCart = (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('name').value;
        const metodoPago = document.getElementById('payment').value;
        const domicilio = document.getElementById('address').value;
        
        Swal.fire({
            title: 'Confirmar compra',
            text: '¿Estás seguro de que deseas realizar la compra? Serás redirigido a WhatsApp para completarla.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, comprar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                let mensajePedido = `Nombre y Apellido: ${nombre}\n`;
                mensajePedido += `Método de Pago: ${metodoPago}\n`;
                mensajePedido += `Método de Entrega: ${entrega}\n`;
                
                if (entrega === 'envio') {
                    mensajePedido += `Domicilio: ${domicilio}\n`;
                    if (total < precioEnvioGratis) {
                        mensajePedido += `Costo de envío: ${formatearMoneda(precioEnvio)} (envío gratis a partir de ${formatearMoneda(precioEnvioGratis)})\n`;
                    } else {
                        mensajePedido += `Costo de envío: GRATIS\n`;
                    }
                }
                
                mensajePedido += 'Pedido:\n';
                cart.forEach((prod) => {
                    const precioFinal = metodoPago === 'transferencia'
                    ? calcularDescuento(prod.precio * prod.quantity, prod.descuento)
                    : prod.precio * prod.quantity;
                    
                    mensajePedido += `*${prod.nombre}${prod.size ? ' - ' + prod.size : ''}*  Cantidad: *${prod.quantity}* Precio: *${formatearMoneda(precioFinal)}*\n`;
                });
                
                mensajePedido += `\nTotal: *${formatearMoneda(totalFinal)}*`;
                
                const numeroWhatsApp = '5493471588965';
                const urlBase = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
                ? 'https://api.whatsapp.com'
                : 'https://web.whatsapp.com';
    
                const urlWhatsApp = `${urlBase}/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensajePedido)}`;
                
                window.open(urlWhatsApp, '_blank');
                clearCart2();
                window.location.href = "/#/gracias";
            }
        });
    };
    
    useEffect(() => {
        let total = calcularTotal();
        let totalConDescuento = total * (1 - descuentoCodigo);
        let totalFinalCalculado = pago === 'transferencia' ? totalConDescuento * 0.9 : totalSinDescuento;
    
        if (entrega === 'envio' && total < precioEnvioGratis) {
            totalFinalCalculado += precioEnvio;
        }
    
        setTotalFinal(totalFinalCalculado);
    }, [entrega, pago, total, descuentoCodigo]);
    

return (
    <div className="containerP">
            <h1>Completa tu Pedido</h1>
            <p>Tenemos 10% de descuento pagando con transferencia y envio gratis a partir de $30.000</p>
            <form onSubmit={(e) => { e.preventDefault(); buyCart(e); }}>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="name">Nombre y Apellido:</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor='payment'>Método de Pago:</label>
                        <select name="payment" id="payment" required value={pago} onChange={handlePagoChange} >
                            <option value="transferencia">Transf. Bancaria</option>
                            <option value="efectivo">Efectivo</option>
                            <option value="tarjeta">Tarjeta</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor='entrega'>Método de Entrega</label>
                        <select name="entrega" id="entrega" required value={entrega} onChange={handleEntregaChange} >
                            <option value="envio">Envío a Domicilio</option>
                            <option value="retiro">Retiro en Local</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Domicilio:</label>
                        <input type="text" id="address" name="address" required />
                    </div>
                </div>
                {descuentoCodigo > 0 && <h4>Descuento por codigo del {descuentoCodigo * 100}%</h4>}
                <h4>Total: {`${formatearMoneda(totalFinal)} ${entrega === 'envio' && total >= precioEnvioGratis ? ' envio gratis' : ''}
                 ${entrega === 'envio' && total < precioEnvioGratis ? '+ ' + formatearMoneda(precioEnvio) + ' de envio' : ''}`}</h4>
                {entrega === 'envio' && total < precioEnvioGratis && <h5>Envío gratis a partir de {formatearMoneda(precioEnvioGratis)}.</h5>}
                <button className="Button" type='submit'>Comprar</button>
            </form>
            
        </div>
    );

}
export default FinishPurchase;