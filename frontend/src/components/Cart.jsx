import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { getUserDate } from '../funciones-componentes/getUserDate.js'
import { getCartById } from '../funciones-componentes/getCarrito.js';
import { updateCart } from '../funciones-componentes/updateCart.js';




export const Cart = () => {
    const [userDate, setUserDate] = useState(null);
    const [cart, setCart] = useState(null);

    const navigate = useNavigate(null)
    const token = document.cookie.split('=')[1];






    useEffect(() => {


        (async function () {
            try {
                // Obtén el token de alguna manera
                const data = await getUserDate(token);
                setUserDate(data);
                console.log("DATA: ", data)

                const cartData = await getCartById(data.cart._id, token);
                setCart(cartData);

                console.log("Token:", token)


            } catch (error) {
                console.error('Error al obtener el nombre del usuario:', userDate);
            }
        })()




    }, []); // El segundo argumento vacío [] asegura que el efecto se ejecute solo una vez al montar el componente

    const handleChangeQuantity = async (event, index, idProd) => {
        const newCart = [...cart];
        newCart[index].quantity = event.target.value;
        setCart(newCart);

        try {
            const respuesta = await updateCart(userDate.cart._id, idProd, token, event.target.value)

            if (!respuesta) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `${respuesta.mensaje}`,
                    showConfirmButton: false,
                    timer: 3000, // Puedes configurar el temporizador si lo deseas
                    backdrop: false, // Fondo no interactivo
                });
            }
        } catch (error) {
            console.log(error)
        }

    }

    const handleDeleteProduct = async (idProd, indice) => {

        try {
            if (await updateCart(userDate.cart._id, idProd, token, 0)) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: "Producto eliminado!!",
                    showConfirmButton: false,
                    timer: 3000, // Puedes configurar el temporizador si lo deseas
                    backdrop: false, // Fondo no interactivo
                });

                const newCart = [...cart]
                newCart.splice(indice, 1)
                setCart(newCart)

            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: "Producto no eliminado",
                    showConfirmButton: false,
                    timer: 3000, // Puedes configurar el temporizador si lo deseas
                    backdrop: false, // Fondo no interactivo
                });
            }
        } catch (error) {

        }

    }

    console.log("Cart: ", cart)




    return (

        <section className="h-100 h-custom" style={{ backgroundColor: "#d2c9ff" }}>

            <h1 className="fw-bold mb-0 text-black">
                Shopping Cart - {userDate && userDate.nombre}
            </h1>

            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12">
                        <div
                            className="card card-registration card-registration-2"
                            style={{ borderRadius: 15 }}
                        >
                            <div className="card-body p-0">
                                <div className="row g-0">
                                    <div className="col-lg-8">
                                        <div className="p-5">
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                                                <h6 className="mb-0 text-muted">3 items</h6>
                                            </div>
                                            <hr className="my-4" />
                                            {
                                                cart && cart.map((item, index) => {
                                                    return (<div className="row mb-4 d-flex justify-content-between align-items-center" key={index}>
                                                        <div className="col-md-2 col-lg-2 col-xl-2">
                                                            <img
                                                                src="/img/aprobado.png"
                                                                className="img-fluid rounded-3"
                                                                alt="Cotton T-shirt"
                                                            />
                                                        </div>
                                                        <div className="col-md-3 col-lg-3 col-xl-3">
                                                            <h6 className="text-muted">{item.id_prod.title}</h6>
                                                            <h6 className="text-black mb-0">{item.id_prod.description}</h6>
                                                        </div>
                                                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">

                                                            <input
                                                                id="quantity"
                                                                min={1}
                                                                name="quantity"
                                                                type="number"
                                                                className="form-control form-control-sm"
                                                                onChange={(e) => handleChangeQuantity(e, index, item.id_prod._id)}
                                                                value={item.quantity}
                                                            />

                                                        </div>
                                                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">

                                                            <h6 className="mb-0">$ {item.id_prod.price * item.quantity}</h6>
                                                        </div>
                                                        <div className="col-md-1 col-lg-1 col-xl-1 d-flex align-items-center justify-content-end">
                                                            <button className="btn btn-link" onClick={() => handleDeleteProduct(item.id_prod._id, index)}>
                                                                <img src="/img/papelera.png" alt="Papelera" width="24" height="24" />
                                                            </button>
                                                        </div>
                                                    </div>)
                                                })
                                            }


                                            <hr className="my-4" />
                                            <div className="pt-5">
                                                <h6 className="mb-0">
                                                    <a href="/products-compra" className="text-body">
                                                        <i className="fas fa-long-arrow-alt-left me-2" />
                                                        Back to shop
                                                    </a>
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 bg-grey">
                                        <div className="p-5">
                                            <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                                            <hr className="my-4" />
                                            <div className="d-flex justify-content-between mb-4">
                                                <h5 className="text-uppercase">Items: {cart && cart.length}</h5>
                                                <h5>$
                                                    {cart &&
                                                        cart.reduce((total, item) => {
                                                            return total + item.id_prod.price * item.quantity;
                                                        }, 0)}
                                                </h5>
                                            </div>
                                            <h5 className="text-uppercase mb-3">Shipping</h5>
                                            <div className="mb-4 pb-2">
                                                <select className="select">
                                                    <option value={1}>Standard-Delivery- €5.00</option>
                                                    <option value={2}>Two</option>
                                                    <option value={3}>Three</option>
                                                    <option value={4}>Four</option>
                                                </select>
                                            </div>
                                            <h5 className="text-uppercase mb-3">Give code</h5>
                                            <div className="mb-5">
                                                <div className="form-outline">
                                                    <input
                                                        type="text"
                                                        id="form3Examplea2"
                                                        className="form-control form-control-lg"
                                                    />
                                                    <label className="form-label" htmlFor="form3Examplea2">
                                                        Enter your code
                                                    </label>
                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="d-flex justify-content-between mb-5">
                                                <h5 className="text-uppercase">Total price</h5>
                                                <h5>$
                                                    {cart &&
                                                        cart.reduce((total, item) => {
                                                            return total + item.id_prod.price * item.quantity;
                                                        }, 0)}
                                                </h5>
                                            </div>
                                            <button
                                                type="button"
                                                className="btn btn-success btn-block btn-lg"
                                                data-mdb-ripple-color="dark"
                                            >
                                                Register
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>



    );
};



