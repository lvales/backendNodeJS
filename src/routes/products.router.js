import { Router } from "express";
import { uploader } from "../utils.js";
import ProductsController from "../controllers/products.controller.js"; 
import { ValidateProduct, ValidateProductPaginate, ValidateId } from "../middlewares/validate.middleware.js";
import { privateAccessApi, adminAccessApi } from "../middlewares/access.middleware.js";

const router = Router();
const productController = new ProductsController;


// Rutas
// Ruta obtener todos los productos
router.get("/", privateAccessApi, ValidateProductPaginate, productController.getAllProducts);

// Ruta obtener producto por id
router.get("/:pid",privateAccessApi, ValidateId, productController.getProductsById);

// Routa agregar producto
router.post("/", uploader.single("thumbnail"), adminAccessApi, ValidateProduct, productController.createProduct);

// Ruta modificar producto
router.put("/:pid", adminAccessApi, ValidateId, productController.updateCart);

// Ruta eliminar producto
router.delete("/:pid", adminAccessApi, ValidateId, productController.deleteProduct);

export default router;
