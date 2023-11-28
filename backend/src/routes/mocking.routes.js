import { Router } from "express";
import {createRandomProduct} from "../mockData/mocking.js"


const mockingRouter = Router()

mockingRouter.get('/', (req, res) => {
    let cantidad = req.query.cantidad; // Cambiado a req.query
    cantidad = parseInt(cantidad, 10);
  
    if (isNaN(cantidad)) {
      res.status(400).json({ error: 'La cantidad debe ser un número entero.' });
      return;
    }
  
    const products = createRandomProduct(cantidad);
    res.send(products);
  });

export default mockingRouter