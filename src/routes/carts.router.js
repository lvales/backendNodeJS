import { Router } from "express";
import CartsController from "../controllers/carts.controller.js";
import { ValidateId } from "../middlewares/validate.middleware.js";

const router = Router();
const cartController = new CartsController;

// Rutas
// Obtener todos los carritos
router.get('/', cartController.getAllCarts);

// Obtener carrito por id
router.get('/:cid', ValidateId, cartController.getCartById);

// Crear carrito
router.post('/', cartController.createCart);

// Agregar producto al carrito
router.post('/:cid/product/:pid', cartController.addToCart);

// Actualizar productos del carrito
router.put('/:cid', ValidateId, cartController.updateCart);

// Actualizar cantidad de un producto del carrito 
router.put('/:cid/product/:pid', cartController.quantityProductCart);

// Eliminar productos del carrito
router.delete('/:cid/product/:pid', cartController.deleteProductCart);

// Eliminar todos los productos de un carrito
router.delete('/:cid',ValidateId, cartController.deleteAllProductCart);

// Finalizar la compra
router.get('/:cid/purchase',ValidateId, cartController.purchaseCart);


export default router;
