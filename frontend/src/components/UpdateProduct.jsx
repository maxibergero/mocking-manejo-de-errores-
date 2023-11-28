import { useNavigate } from "react-router-dom"
import { useRef } from "react"
import { getCookiesByName } from "../utils/formsUtils.js"
import React, { useState } from 'react';

export const UpdateProduct = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        stock: '',
        code: '',
        category: 'Alimentos',
        txtBuscar: "",
      });
    
    const navigate = useNavigate()
    const formRef = useRef(null)
    
    
    const handleUpdate = async (e) => {
        e.preventDefault()
        
        const datForm = new FormData(formRef.current) //Tranformo un HTML en un objet iterator
        const data = Object.fromEntries(datForm)
        const token = getCookiesByName('jwtCookie')
       
        

        const idProduct = data.idProduct


        
        const response = await fetch(`http://localhost:4000/api/products/${idProduct}`, {
            method: 'PUT',
            headers: {
                'Authorization': `${token}`,
                'Content-type': 'application/json'
            },

            body: JSON.stringify(data)
            })
          
        if(response.status === 200){

            const datos = await response.json()


            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Actualizado con éxito!!",
                showConfirmButton: false,
                timer: 1500, // Puedes configurar el temporizador si lo deseas
                backdrop: false, // Fondo no interactivo
              });
             

              
              console.log("Producto devuelto:", datos)
              setFormData({
                title: '',
                description: '',
                price: '',
                stock: '',
                code: '',
                category: 'Alimentos',
                txtBuscar: ""
            });

        }else{

            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Producto no pudo ser actualizado",
                showConfirmButton: false,
                timer: 3000, // Puedes configurar el temporizador si lo deseas
                backdrop: false, // Fondo no interactivo
              });
              navigate('/update-Product')
        }
       
    }

    const handleVolver = () => {
        navigate('/products')
    }

    const handleBuscar = async(e) => {
        e.preventDefault()
        
        
        console.log("Va bien")
        const datForm = new FormData(formRef.current) //Tranformo un HTML en un objet iterator
        const data = Object.fromEntries(datForm)
        const token = getCookiesByName('jwtCookie')
        
        const idProduct = data.idProduct
        

        const response = await fetch(`http://localhost:4000/api/products/${idProduct}`, {

            method: "GET",
            headers: {
                'Authorization': `${token}`,
                'Content-type': 'application/json'
            }
        })

        if(response.status === 200){
            const datos = await response.json()
            console.log(datos)
             

            
              setFormData({ ...formData, 
                title: datos.title,
                description: datos.description,
                price: datos.price,
                stock: datos.stock,
                code: datos.code,
                category: datos.category
            });


            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Producto encontrado con éxito",
                showConfirmButton: false,
                timer: 3000, // Puedes configurar el temporizador si lo deseas
                backdrop: false, // Fondo no interactivo
              });
              

        }else{
            const respuesta = await response.json()
            console.log("Error al buscar id de producto: ", respuesta.error)
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Producto no encontrado",
                showConfirmButton: false,
                timer: 3000, // Puedes configurar el temporizador si lo deseas
                backdrop: false, // Fondo no interactivo
              });
        }


    }   


    return (
        
        
    
        <div className="container">
        
        <form  ref={formRef}>
        <h2>Buscar Producto</h2>
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="ID del Producto"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                name="idProduct"
                id="idProduct"
                value={formData.txtBuscar}
                    onChange={(e) => setFormData({ ...formData, txtBuscar: e.target.value })}
            />
            <button className="btn btn-primary" type="button" id="btnBuscar" onClick={handleBuscar}>
                Buscar
            </button>

        </div>
        <hr />
        <h2>Modificar Producto</h2>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title: </label>
                <input 
                    type="text" id= "title "name="title" className="form-control"  required  value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description: </label>
                <input 
                    type="text" id="description" name="description" className="form-control" required  value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price: </label>
                <input 
                    type="number" id="price" name="price" className="form-control" required  value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="stock" className="form-label">Stock: </label>
                <input
                     type="text" id="stock" name="stock" className="form-control" required  value={formData.stock}
                     onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="code" className="form-label">Code: </label>
                <input 
                    type="text" id="code" name="code" className="form-control" required  value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="category" className="form-label mt-4">Category</label>
                <select className="form-select" id="category" name="category">
                  <option>Alimentos</option>
                  <option>Bebidas</option>
                  <option>Limpieza</option>
                  <option>Golisina</option>
                  <option>Otros</option>
                </select>
             </div>
             
             <div  className="mb-3" style={{ marginTop: '50px' }}>
                <button  className="btn btn-primary" id="btnActualizar" name ="btnActualizar" onClick={handleUpdate} style={{ marginRight: '10px' }}>Actualizar</button>
                <button  className="btn btn-primary" id="btnVolver" name ="btnVolver" onClick={handleVolver}>Volver</button>
            </div>
        </form>
  
        </div>
    ) 

}