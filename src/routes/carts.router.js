import { Router } from "express";
import CartDao from "../dao/mongoDb/CartDao.js";
import CartsController from "../controllers/carts.controller.js";

const router = Router();
const dao = new CartDao();

const cartController = new CartsController;

// Rutas
// Obtener todos los carritos
router.get('/', cartController.getAllCarts);

// Obtener carrito por id
router.get('/:cid', cartController.getCartById);

// Crear carrito
router.post('/', cartController.createCart);

// Agregar producto al carrito
router.post('/:cid/product/:pid', cartController.addToCart);

// Actualizar productos del carrito
router.put('/:cid', cartController.updateCart);

// Actualizar cantidad de un producto del carrito 
router.put('/:cid/product/:pid', cartController.quantityProductCart);

// Eliminar productos del carrito
router.delete('/:cid/product/:pid', cartController.deleteProductCart);

// Eliminar todos los productos de un carrito
router.delete('/:cid', cartController.deleteAllProductCart);


export default router;
