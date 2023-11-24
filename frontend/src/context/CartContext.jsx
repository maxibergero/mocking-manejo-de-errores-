import { createContext, useContext, useState } from 'react';


const CartContext = createContext();

export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState([]);

  const [stringPrueba, setStringPrueba] = useState("")

  const addToCart = (item) => {
    setCartItems((prevCartItems) => {
      console.log("desde context: ", cartItems)
        return [...prevCartItems, item];
    });

    
};


const prueba = (cadena) => {
  setStringPrueba(cadena)
  
}

 


  const removeFromCart = (item) => {
    setCartItems(cartItems.filter((cartItem) => cartItem !== item));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, prueba }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}