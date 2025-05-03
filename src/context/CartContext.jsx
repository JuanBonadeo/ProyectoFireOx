import { createContext, useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2'


export const CartContext = createContext([])
export const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export const CartProvider = ({ children }) => {
  const initialCart = JSON.parse(localStorage.getItem('cart')) || []
  const [cart, setCart] = useState(initialCart)
  const [descuentoCodigo, setDescuentoCodigo] = useState(0);
  // Actualizar localStorage cada vez que cambia el carrito
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const isInCart = (id) => {
    return cart.some(prod => prod.id === id)
  }

const addItem = (productToAdd) => {
  const { id, nombre, precio, quantity, img1, descuento, stock, size, conTamanios } = productToAdd;

  // Comprobar si el producto con el tamaño específico ya está en el carrito
  const existingProductIndex = cart.findIndex(prod => prod.id === id && prod.size === size);

  if (existingProductIndex !== -1) {
    // Si el producto ya está en el carrito, actualizar la cantidad si es menor que 10
    const updatedCart = cart.map((prod, index) => {
      if (index === existingProductIndex && prod.quantity < 10) {
        return {
          ...prod,
          quantity: prod.quantity + quantity  
        };
      }
      return prod;
    });

    setCart(updatedCart);

    
    Toast.fire({
      icon: 'success',
      title: `${nombre} ${conTamanios ? (size) : ''} agregado al carrito`
    });
  } else {
    // Si no existe, agregar el producto con su tamaño
    setCart(prev => [...prev, { id, nombre, precio, quantity, img1, descuento, stock, size }]);

    Toast.fire({
      icon: 'success',
      title: `${nombre} (${size}) ha sido agregado al carrito`
    });
  }
};


  const removeItem = (id, size) => {
    const updatedCart = cart.filter(prod => !(prod.id === id && prod.size === size));
    setCart(updatedCart);
    Toast.fire({
      icon: "info",
      title: `Producto eliminado`
    });
  };

  const updateQuantity = (id, addedQuantity, size) => {
    const updatedCart = cart.map(prod => {
      // Si el producto tiene tamaño y coincide el id y el tamaño, o si no tiene tamaño y solo coincide el id
      if ((prod.id === id && prod.size === size) || (prod.id === id && !prod.size)) {
        const newQuantity = prod.quantity + addedQuantity;
  
        if (newQuantity <= 0) {
          // Si la cantidad es 0 o menos, eliminamos el producto
          Toast.fire({
            icon: "info",
            title: `Producto (${prod.size ? `${prod.size}` : 'sin tamaño'}) eliminado`
          });
          return null; // Marcar este producto para eliminar
        } else if (newQuantity <= 10) {
          return {
            ...prod,
            quantity: newQuantity
          };
        }
      }
      return prod; // Si no se cumplen las condiciones, no hacemos nada con este producto
    });
  
    // Filtrar los productos eliminados (null) del carrito
    const finalCart = updatedCart.filter(prod => prod !== null);
    setCart(finalCart); // Actualizar el carrito con los productos modificados
  };
  
  const updateQuantitySelect = (id, newQuantity) => {
    const updatedCart = cart.map(prod => {
      if (prod.id === id && newQuantity <= 10) {
        return {
          ...prod,
          quantity: newQuantity
        };
      } else {
        return prod;
      }
    });
    setCart(updatedCart);
  }
  const formatearMoneda = (cantidad) => {
    const formatoMonedaArgentina = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    });

    return formatoMonedaArgentina.format(cantidad);
  }
  const calcularDescuento = (precio, descuento ) => {
    return formatearMoneda(precio - (precio * descuento / 100))
  }
  const getTotalQuantity = () => {
    let totalQuantity = 0

    cart.forEach(prod => {
      totalQuantity += prod.quantity
    })

    return totalQuantity
  }

  const totalQuantity = getTotalQuantity()

  const getTotal = () => {
    let total = 0

    cart.forEach(prod => {
      let totP = (prod.precio - (prod.precio * prod.descuento / 100)) * prod.quantity
      total += totP
    })

    return total
  }

  let total = getTotal()

  const getTotalSinDescuento = () => {
    let totalSinDescuento = 0

    cart.forEach(prod => {
      let totP = prod.precio * prod.quantity
      totalSinDescuento += totP
    })

    return totalSinDescuento
  }
  let totalSinDescuento = getTotalSinDescuento()


  const clearCart = () => {

    Swal.fire({
      title: '¿Deseas limpiar el carrito?',
      showCancelButton: true,
      confirmButtonText: 'Limpiar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Toast.fire('', "carrito limpio", 'info')
        setCart([])
      }
    })
  }
  const clearCart2 = () => {
    Toast.fire('', "carrito limpio", 'info')
    setCart([])


  }



  return (
    <CartContext.Provider value={{ cart, addItem, totalQuantity, removeItem, isInCart, total, clearCart, updateQuantity, updateQuantitySelect, formatearMoneda, calcularDescuento, clearCart2, descuentoCodigo, setDescuentoCodigo,totalSinDescuento}}>
      {children}
    </CartContext.Provider>
  )
}

