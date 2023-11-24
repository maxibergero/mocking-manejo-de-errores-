export const deleteCart = async (idCart, idProduct, token) => {


    try {

        const response = await fetch(`htpp://localhost:4000/api/carts/${idCart}/products/${idProduct}`, {

            method: "DELETE",
            headers: {
                "autorization": `${token}`,
                "content-type": "aplication/json"
            }
        })

        if(response.status === 200){
            return true
        }else{
            return false
        }

    } catch (error) {
        throw new Error(error)
    }




}