export const updateCart = async (idCart, idProduct, token, quantity) => {

    try {
        const response = await fetch(`http://localhost:4000/api/carts/${idCart}/products/${idProduct}`, {

            method: 'POST',
            headers: {
                'Authorization': `${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ 'quantity': quantity })
        })

        const data = await response.json()

        if(response.status === 200){
            return true

        }else{
            return data.mensaje
        }
    } catch (error) {
        throw new Error(error)
    }




}