export const AddProductForm = () => {
    const formRef = useRef(null)
    const navigate = useNavigate()

    const handleSumbit = async (e) => {
        e.preventDefault()
        const datForm = new FormData(formRef.current) //Tranformo un HTML en un objet iterator
        const data = Object.fromEntries(datForm)
        const token = getCookiesByName('jwtCookie')
        console.log(token)
        const response = await fetch('http://localhost:4000/api/products', {
            method: 'POST',
            headers: {
                'Authorization': `${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (response.status == 200) {
            const datos = await response.json()
            console.log(datos)
        } else {
            const datos = await response.json()
            console.log(datos)
        }
    }

    return (
      <div className="container">
      <h2>Agregar producto</h2>
      <form onSubmit={handleSubmit} ref={formRef}>
          <div className="mb-3">
              <label htmlFor="title" className="form-label">Title: </label>
              <input type="text" id= "title "name="title" className="form-control" required />
          </div>
          <div className="mb-3">
              <label htmlFor="description" className="form-label">Description: </label>
              <input type="text" id="description" name="description" className="form-control" required/>
          </div>
          <div className="mb-3">
              <label htmlFor="price" className="form-label">Price: </label>
              <input type="number" id="price" name="price" className="form-control" required/>
          </div>
          <div className="mb-3">
              <label htmlFor="stock" className="form-label">Stock: </label>
              <input type="text" id="stock" name="stock" className="form-control" required/>
          </div>
          <div className="mb-3">
              <label htmlFor="code" className="form-label">Code: </label>
              <input type="text" id="code" name="code" className="form-control" required/>
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
           
           <div className="mt-4">
              <button type="submit" className="btn btn-primary">Agregar</button>
           </div>
      </form>

</div>
    )
}