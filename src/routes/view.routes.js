import { Router } from "express";
import ProductManager from "../manager/ProductManager.js";

const manager = new ProductManager('./data/products.json');

const router = Router();

// View routes
// Home 
router.get('/', async (req, res) => {
  const productos = await manager.getProducts();
  res.render('home', {
    productos
  });
});

// Route para agregar producto
router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', {});
});

export default router;
