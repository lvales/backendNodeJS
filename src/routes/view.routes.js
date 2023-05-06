import { Router } from "express";
import ProductDao from "../dao/ProductDAO.js";

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

router.get('/chat', (req, res) => {
  res.render('chat', {});
});

export default router;
