import { Router } from "express";
import ProductManager from "../manager/ProductManager.js";

const manager = new ProductManager('./data/products.json');

const router = Router();

router.get('/', async (req,res) => {

   const productos = await manager.getProducts();
   res.render('home', {
      productos
   });
});

export default router;