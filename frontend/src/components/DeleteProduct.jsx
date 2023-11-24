import { useNavigate } from "react-router-dom"
import { useRef } from "react"
import { getCookiesByName } from "../utils/formsUtils.js"

export const DeleteProduct = () => {

    const navigate = useNavigate()
    const formRef = useRef(null)
    
    const handleEliminar = async (e) => {
        e.preventDefault()
        
        const datForm = new FormData(formRef.current) //Tranformo un HTML en un objet iterator
        const data = Object.fromEntries(datForm)
        const token = getCookiesByName('jwtCookie')
        console.log(token)

        const idProduct = data.idProduct
        
        const response = await fetch(`http://localhost:4000/api/products/${idProduct}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${token}`,
                'Content-type': 'application/json'
            }
            })
          
        if(response.status === 200){

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Producto Eliminado con éxito",
                showConfirmButton: false,
                timer: 3000, // Puedes configurar el temporizador si lo deseas
                backdrop: false, // Fondo no interactivo
              });
            navigate('/products')

        }else{
            const datos = await response.json()

            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `${datos.error}`,
                showConfirmButton: false,
                timer: 3000, // Puedes configurar el temporizador si lo deseas
                backdrop: false, // Fondo no interactivo
              });
              navigate('/delete-product')
        }
       
    }

    const handleVolver = () => {
        navigate('/products')
    }


    return (

        <div className="container">
        <h2>Eliminar Producto</h2>
        <form  ref={formRef}>
            <div className="mb-3">
                <label htmlFor="idProduct" className="form-label">ID de Producto: </label>
                <input type="text" id= "idProduct "name="idProduct" className="form-control" />
            </div>
            <div>
                <button  className="btn btn-primary" id="btnEliminar" name ="btnEliminar" onClick={handleEliminar} style={{ marginRight: '10px' }}>Eliminar</button>
                <button  className="btn btn-primary" id="btnVolver" name ="btnVolver" onClick={handleVolver}>Volver</button>
            </div>
            
        </form>

        </div>
    ) 

}