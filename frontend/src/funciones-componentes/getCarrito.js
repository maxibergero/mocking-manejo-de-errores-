export const getCartById = async (idCart, token) => {


    try {

        const response = await fetch(`http://localhost:4000/api/carts/${idCart}`, {

            method: "GET",
            headers: {
                'Authorization': `${token}`,
                'Content-type': 'application/json'
            }
        })

        if (response.status === 200) {
            const cart = await response.json()
            return cart.mensaje.products
            
        } else {
            return cart.mensaje
        }

    } catch (error) {
        throw new Error(error)
    }



}

