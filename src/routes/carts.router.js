import { Router } from "express";
import CartsController from "../controllers/carts.controller.js";
import { ValidateId } from "../middlewares/validate.middleware.js";
import { privateAccessApi, adminAccessApi, userAccessApi } from "../middlewares/access.middleware.js";

const router = Router();
const cartController = new CartsController;

// Rutas
// Obtener todos los carritos
router.get('/', privateAccessApi,cartController.getAllCarts);

// Obtener carrito por id
router.get('/:cid', privateAccessApi, ValidateId, cartController.getCartById);

// Crear carrito
router.post('/', userAccessApi, cartController.createCart);

// Agregar producto al carrito
router.post('/:cid/product/:pid', userAccessApi, cartController.addToCart);

// Actualizar productos del carrito
router.put('/:cid', userAccessApi, cartController.updateCart);

// Actualizar cantidad de un producto del carrito 
router.put('/:cid/product/:pid',userAccessApi, cartController.quantityProduct);

// Eliminar productos del carrito
router.delete('/:cid/product/:pid', userAccessApi, cartController.deleteProductFromCart);

// Eliminar todos los productos de un carrito
router.delete('/:cid',userAccessApi, cartController.deleteAllProductsFromCartCart);

// Finalizar la compra
router.get('/:cid/purchase',userAccessApi, cartController.purchaseCart);


export default router;
