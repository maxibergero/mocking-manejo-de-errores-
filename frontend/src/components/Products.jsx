import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import ReactPaginate from 'react-paginate';
import { useRef } from 'react';



export const Products = () => {

    const navigate = useNavigate()

    const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

    const [inputValueLimMax, setInputValueLimMax] = useState("");
    const [inputValuePage, setInputValuePage] = useState("");
    const [mostrarTodos, setMostrarTodos] = useState(false);

    const [formPagination, setPagination] = useState({
        hasNextPage: false,
        hasPrevPage: false,
        limit: "",
        nextPage: "",
        page: "",
        totalDocs: "",
        totalPages: "",
        docs: []

    });





    async function getDatos(limit, page) {


        console.log("limit page: ", limit)
        console.log("nroPage: ", page)
        console.log("SE  ejecuta getDatos")



        try {
            const response = await fetch(`http://localhost:4000/api/products?limit=${limit = limit ? limit : ""}&page=${page = page ? page : ""}`);

            if (!response.ok) {
                throw new Error('Not found Products');
            }

            const data = await response.json();

            console.log(`http://localhost:4000/api/products?limit=${limit}&page=${page}`)
            console.log(data)


            setPagination((prevPagination) => ({
                ...prevPagination,
                hasNextPage: data.hasNextPage,
                hasPrevPage: data.hasPrevPage,
                limit: data.limit,
                nextPage: data.nextPage,
                page: data.page,
                totalDocs: data.totalDocs,
                totalPages: data.totalPages,
                docs: data.docs
            }));

            setInputValuePage(page)



        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        getDatos();

    }, []);

    const handleRowMouseEnter = (index) => {
        setHoveredRowIndex(index);
    };

    const handleRowMouseLeave = () => {
        setHoveredRowIndex(null);
    };



    const handleAgregarProductoClick = () => {
        // Lógica para el evento de "Agregar Producto"
        console.log('Botón "Agregar Producto" clickeado');
        navigate('/new-product')

    };

    const handleEliminarProductoClick = () => {
        console.log("Eliminar producto")
        navigate('/delete-product')
    }

    const handleModificarProductoClick = () => {
        console.log("Modificar producto")
        navigate('/update-product')
    }

    const handleBuscarProductoClick = () => {
        console.log("Buscar producto")

    }

    const handlePageChange = () => {
        console.log("Evento cambio de página")
    }

    const handlePageClick = (paginaActual) => {
        setPagination((prevPagination) => ({
            ...prevPagination,
            page: paginaActual,
        }));

        console.log("Se eejctuta HandlePageCLicks: ", formPagination.limit, paginaActual)

        getDatos(formPagination.limit, paginaActual)



    };

    const handleMostrarTodosChange = () => {
        setMostrarTodos(!mostrarTodos)

        if(!mostrarTodos){
            getDatos(formPagination.totalDocs, 1)

        }else{
            getDatos()
            
        }
    }

    const generarItemsPagination = () => {
        const { page, totalPages } = formPagination;
        const items = [];

        // Define el rango de páginas a mostrar
        const range = 5; // Puedes ajustar este valor para cambiar cuántas páginas se muestran

        // Calcula el rango de páginas a mostrar
        const startIndex = Math.max(1, page - Math.floor(range / 2));
        const endIndex = Math.min(totalPages, startIndex + range - 1);

        for (let i = startIndex; i <= endIndex; i++) {
            items.push({
                pageNumber: i,
                isActive: i === page,
            });
        }

        return items;
    };
    const handleLimPag = () => {

        const limitPage = inputValueLimMax
        console.log("Limite por página: ", inputValueLimMax)
        setPagination((prevPagination) => ({
            ...prevPagination,
            limi: limitPage,
            page: 1
        }))
        console.log("LimitPage y FormPagination: ", limitPage, formPagination.page)
        getDatos(limitPage, 1)

    }

    const handlePage = () => {
        console.log("HandlePAge: ", inputValuePage)

        setPagination((prevPagination) => ({
            ...prevPagination,
            page: inputValuePage
        }))

        getDatos(formPagination.limit, inputValuePage)
    }

    const handleSiguiente = () => {

        if (formPagination.hasNextPage) {
            setPagination((prevPagination) => ({
                ...prevPagination,
                page: (formPagination.page + 1) <= formPagination.totalPages ? formPagination.page + 1 : formPagination.page,
                hasNextPage: formPagination.page + 1 < formPagination.totalPages
            }));


            getDatos(formPagination.limit, formPagination.page + 1)
        }
    }

    const handleAnterior = () => {
        if (formPagination.hasPrevPage) {
            setPagination((prevPagination) => ({
                ...prevPagination,
                page: formPagination.page - 1 > 0 ? formPagination.page - 1 : formPagination.page,
                hasPrevPage: formPagination.page - 1 > 0
            }));
            getDatos(formPagination.limit, formPagination.page - 1)
        }
    }

    return (
        <div>
            <div >
                <h1>Productos</h1>
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckChecked"
                        defaultChecked={mostrarTodos}
                        onChange={handleMostrarTodosChange}
                    />
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                        Mostrar Todos
                    </label>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr className="table-dark">
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Category</th>
                            <th scope="col">Status</th>
                            <th scope="col">Code</th>
                        </tr>
                    </thead>
                    <tbody>

                        {formPagination.docs.map((product, index) => {
                            let rowColor = index % 2 === 0 ? "table-active" : "table-light";
                            if (hoveredRowIndex === index) {
                                rowColor = "table-info";
                            }

                            return (
                                <tr
                                    key={index}
                                    className={rowColor}
                                    onMouseEnter={() => handleRowMouseEnter(index)}
                                    onMouseLeave={handleRowMouseLeave}
                                >
                                    <th scope="row">{product.title}</th>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.status === true ? "Activo" : "Desactivo"}</td>
                                    <td>{product.code}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="d-flex justify-content-center">
                    <ul className="pagination">

                        <li className={formPagination.hasPrevPage ? "page-item" : "page-item disabled"}>
                            <a className="page-link" href="#" onClick={handleAnterior}>&laquo;</a>
                        </li>
                        {generarItemsPagination().map((item, index) => (
                            <li key={index} className={item.isActive ? 'page-item active' : 'page-item'}>
                                <a className="page-link" href="#" onClick={() => handlePageClick(item.pageNumber)}>
                                    {item.pageNumber}
                                </a>
                            </li>
                        ))}
                        <li className={formPagination.hasNextPage ? "page-item" : "page-item disabled"}>
                            <a className="page-link" href="#" onClick={handleSiguiente} >&raquo;</a>
                        </li>
                        <div className="input-group w-45">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Página"
                                aria-label="Recipient's username"
                                aria-describedby="button-addon2"
                                style={{ marginLeft: '10px', width: '50px' }}
                                id="txtPage"
                                name='txtPage'
                                value={inputValuePage}
                                onChange={(e) => setInputValuePage(e.target.value)}

                            />
                            <button className={!mostrarTodos ? "btn btn-primary" : "btn btn-primary disabled"} type="button" id="btnPage" onClick={handlePage}>
                                Page
                            </button>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Máximo por página"
                                aria-label="Recipient's username"
                                aria-describedby="button-addon2"
                                style={{ marginLeft: '10px' }}
                                id="txtLimPage"
                                name='txtLimPage'
                                value={inputValueLimMax}
                                onChange={(e) => setInputValueLimMax(e.target.value)}
                            />
                            <button className={!mostrarTodos ? "btn btn-primary" : "btn btn-primary disabled"} type="button" id="btnMaxPage" onClick={handleLimPag}>
                                MaxPage
                            </button>

                        </div>
                    </ul>

                </div>

                <div>

                </div>


            </div>

            <div className="d-flex justify-content-center text-center">
                <button type="button" className="btn btn-dark mx-2" onClick={handleAgregarProductoClick}>Agregar Producto</button>
                <button type="button" className="btn btn-dark  mx-2" onClick={handleEliminarProductoClick}>Eliminar Producto</button>
                <button type="button" className="btn btn-dark  mx-2" onClick={handleModificarProductoClick}>Modificar Producto</button>
                <button type="button" className="btn btn-dark  mx-2" onClick={handleBuscarProductoClick}>Buscar Producto</button>
            </div>

        </div>


    );
};

