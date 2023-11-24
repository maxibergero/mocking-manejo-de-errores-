// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState({ nombre: "hola", carrito: ""}); // Aquí puedes inicializar el estado con el usuario actual

  const contextLogin =  async (token) => {
    // La sesión ya fue realizada 

    console.log("DEsde ContextLogin: ", token)
    const response = await fetch(`http://localhost:4000/api/sessions/getUser`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
                'Content-type': 'application/json'
            }
            })
    
    if(response.status === 200){

        const newUser = await response.json()
        console.log("Users:", newUser)

        setUser(newUser)

        console.log("Nuevo usuario: ", user)
    }else{

    }


  };

  const contextLogout = () => {
    // Realiza la lógica de cierre de sesión y actualiza el estado del usuario
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, contextLogin, contextLogout }}>
      {children}
    </UserContext.Provider>
  );
}