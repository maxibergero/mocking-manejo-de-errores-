import { useRef } from "react"
import { useNavigate } from "react-router-dom"


export const Login = () => {

    
    
    const formRef = useRef(null)
    const navigate = useNavigate()

    const handleSumbit = async (e) => {
        e.preventDefault()
        const datForm = new FormData(formRef.current) //Tranformo un HTML en un objet iterator
        const data = Object.fromEntries(datForm)

        fetch('http://localhost:4000/api/sessions/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
            })
            .then((response) => {
                // En este punto, la cookie debería haberse almacenado en el navegador
                // Puedes acceder a ella desde document.cookie
                console.log(document.cookie);
                return response.json();
            })
            .then((data) => {
                // Aquí puedes procesar la respuesta del servidor, pero la cookie ya está disponible en document.cookie
                
                document.cookie = `jwtCookie=${data.token}; expires${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()};path=/;`

                console.log("Desde getDatos - Login - Cookies:", data.token)
                



                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: "Login validado",
                    showConfirmButton: false,
                    timer: 3000, // Puedes configurar el temporizador si lo deseas
                    backdrop: false, // Fondo no interactivo
                  });
                navigate('/products-compra')
            })
            .catch((error) => {
                console.error('Error de login', error);
            });
    }

    return (
        <div className="container">
            <h2>Formulario de Login</h2>
            <form onSubmit={handleSumbit} ref={formRef}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email: </label>
                    <input type="email" id= "email "name="email" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password: </label>
                    <input type="password" id="password" name="password" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Iniciar Sesion</button>
            </form>

        </div>
    )
}