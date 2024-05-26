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
    const { id, nombre, precio, quantity, img1, descuento, stock } = productToAdd;

    // Comprobar si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex(prod => prod.id === id);

    if (existingProductIndex !== -1) {
      // Si el producto ya está en el carrito, actualizar la cantidad si es menor que 10
      const updatedCart = cart.map((prod, index) => {
        if (index === existingProductIndex && prod.quantity < 10) {
          return {
            ...prod,
            quantity: prod.quantity + 1
          };
        }
        return prod;
      });

      setCart(updatedCart);

      // Mostrar el toast después de actualizar el carrito
      Toast.fire({
        icon: 'success',
        title: `${nombre} agregado al carrito`
      });
    } else {
      setCart(prev => [...prev, { id, nombre, precio, quantity, img1, descuento, stock }]);

      Toast.fire({
        icon: 'success',
        title: `${nombre} ha sido agregado al carrito`
      });
    }
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(prod => !(prod.id === id));
    setCart(updatedCart);
    Toast.fire({
      icon: "info",
      title: `Producto eliminado`
    });
  };

  const updateQuantity = (id, addedQuantity) => {
    const updatedCart = cart.map(prod => {
      if (prod.id === id && prod.quantity + addedQuantity <= 10) {
        const newQuantity = prod.quantity + addedQuantity;
        if (newQuantity <= 0) {
          Toast.fire({
            icon: "info",
            title: `eliminado`
          })
          return null;
        } else {
          return {
            ...prod,
            quantity: newQuantity
          };
        }
      } else {
        return prod;
      }
    }).filter(Boolean); // Remove any null values from the updatedCart array
    setCart(updatedCart);
  }
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
  const calcularDescuento = (precio, descuento) => {
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
    <CartContext.Provider value={{ cart, addItem, totalQuantity, removeItem, isInCart, total, clearCart, updateQuantity, updateQuantitySelect, formatearMoneda, calcularDescuento, clearCart2, descuentoCodigo, setDescuentoCodigo}}>
      {children}
    </CartContext.Provider>
  )
}

