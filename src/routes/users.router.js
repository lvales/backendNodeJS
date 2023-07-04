import { Router } from "express";
import UserController from "../controllers/users.controller.js";


const router = Router();
const userController = new UserController;

// Rutas
// Ruta obtener todos los usuarios
router.get("/", userController.getAllUsers);

// Ruta obtener usuario por id
router.get("/:uid", userController.getUserById);

// Routa obtener cartID por userID
router.get("/cart/:cid", userController.getUserByIdCart);

export default router;
