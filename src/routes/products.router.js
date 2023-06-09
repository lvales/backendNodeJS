import { Router } from "express";
import { uploader } from "../utils.js";
import ProductsController from "../controllers/products.controller.js"; 
import { ValidateProduct, ValidateProductPaginate, ValidateId } from "../middlewares/validate.middleware.js";

const router = Router();
const productController = new ProductsController;


// Rutas
// Ruta obtener todos los productos
router.get("/", ValidateProductPaginate, productController.getAllProducts);

// Ruta obtener producto por id
router.get("/:pid", ValidateId, productController.getProductsById);

// Routa agregar producto
router.post("/", uploader.single("thumbnail"), ValidateProduct, productController.createProduct);

// Ruta modificar producto
router.put("/:pid", ValidateId, productController.updateProduct);

// Ruta eliminar producto
router.delete("/:pid", ValidateId, productController.deleteProduct);

export default router;
