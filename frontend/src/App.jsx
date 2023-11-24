import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Register } from './components/Register'
import { Login } from './components/Login'
import { Products } from './components/Products'
import { NewProducts } from './components/NewProducts'
import { DeleteProduct } from './components/deleteProduct'
import { UpdateProduct } from './components/UpdateProduct'
import { Cart } from './components/Cart'
import { ProductsCompra } from './components/ProductsCompra'



export const App = () => {




  return (

    <>
      <BrowserRouter>

        <Routes>

          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/products' element={<Products />} />
          <Route path='/new-product' element={<NewProducts />} />
          <Route path='/delete-product' element={<DeleteProduct />} />
          <Route path='/update-product' element={<UpdateProduct />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/products-compra' element={<ProductsCompra />} />

        </Routes>


      </BrowserRouter>
    </>
  )
}