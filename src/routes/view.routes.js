import { Router } from "express";

import ViewController from "../controllers/view.controller.js";
import { publicAccess, privateAccess, adminAccess, userAccess } from "../middlewares/access.middleware.js";

const router = Router();
const viewController = new ViewController()


// Rutas de vista
// Página de inicio de sesión
router.get('/', publicAccess, viewController.getHome);

// Página de registro
router.get('/register', publicAccess, viewController.getRegister);

// Página para restablecer contraseña
router.get('/resetPassword', publicAccess, viewController.getrefreshPass);

// Página de perfil
router.get('/profile', privateAccess, viewController.getProfile);

// Ruta para agregar y eliminar productos
router.get('/realtimeproducts', adminAccess, viewController.getRealTimeProducts);

// Ruta para ver productos
router.get('/products', privateAccess, viewController.getViewProducts);

// Ruta para ver carrito
router.get('/carts/:cid', viewController.getViewCart);

// Ruta de chat
router.get('/chat', privateAccess, userAccess, viewController.getChat);

export default router;
