import { Router } from "express";
import ProductDao from "../dao/mongoDb/ProductDao.js";

const router = Router();
const dao = new ProductDao();

// View routes
// Home 
router.get('/', async (req, res) => {
  const productos = await dao.getProducts();
  res.render('home', {
    productos
  });
});

// Route para agregar producto
router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', {});
});

// Route chat
router.get('/chat', (req, res) => {
  res.render('chat', {});
});

// Route para vizualizar productos 
router.get('/products', (req, res) => {
  res.render('products', {});
});

// Route para vizualizar carrito
router.get('/carts/:cid', (req, res) => {
  res.render('cartId', {});
});

export default router;
