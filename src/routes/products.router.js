import { Router } from "express";
import { uploader } from "../utils.js";
import ProductsController from "../controllers/products.controller.js"; 
import { ValidProduct, ValidProductPaginate } from "../middlewares/validate.middleware.js";

const router = Router();
const productController = new ProductsController;


// Rutas
// Ruta obtener todos los productos
router.get("/", ValidProductPaginate, productController.getAllProducts);

// Ruta obtener producto por id
router.get("/:id", productController.getProductsById);

// Routa agregar producto
router.post("/", uploader.single("thumbnail"), ValidProduct, productController.createProduct);

// Ruta modificar producto
router.put("/:id", productController.updateProduct);

// Ruta eliminar producto
router.delete("/:id", productController.deleteProduct);

export default router;
