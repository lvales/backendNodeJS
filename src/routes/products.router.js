import { Router } from "express";
import { uploader } from "../utils.js";
import ProductDao from "../dao/mongoDb/ProductDao.js";

const router = Router();
const dao = new ProductDao();

// Rutas
// Obtener todos los productos
router.get("/", async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const  query  = req.query.query ;
  const sort = req.query.sort;

  const result = await dao.getProducts(limit, page, query, sort);

  return res.send({
    satus: 'success',
    payload: result
  });
});

// Obtener producto por id
router.get("/:id", async (req, res) => {
  const pid = req.params.id;
  const product = await dao.getProductById(pid);

  if(product.exists === false){
    return res.status(404).send({
      status: 'ERROR',
      msg: `El producto con id ${pid} no existe.`
    });
  }

  return res.send({
    status: 'success',
    products: product,
  });

});

// Agregar producto
router.post("/", uploader.single("thumbnail"), async (req, res) => {
  const reqProduct = req.body;
  
  if(req.file){
    const filename = req.file.filename;
    reqProduct.thumbnail = [`http://localhost:8080/images/${filename}`];
  };
  
  const product = await dao.addProduct(reqProduct);
  console.log(product);

  // Producto incompleto
  if (product.incomplete === true) {
    return res.status(409).send({
      status: 'ERROR: Producto incompleto',
      msg: 'Producto incompleto, faltan parametros, debe completarlos todos'
    });
  }
  // Producto duplicado
  if (product.duplicate === true) {
    return res.status(409).send({
      status: 'ERROR: Producto duplicado',
      msg: 'El codigo de producto ya exixte en la base de datos'
    });
  }

  return res.send({
    status: 'success',
    product
  });
});

// Modificar producto
router.put("/:id", async (req, res) => {
  const reqProduct = req.body;
  const pid = req.params.id;

  const updateProduct = await dao.updateProduct(pid, reqProduct);

  if (updateProduct.exists === false) {
    return res.status(404).send({
      status: 'ERROR: Producto no encontrado',
      msg: `El producto con id ${id} no existe`
    });
  }

  if (updateProduct.duplicate === true) {
    return res.status(404).send({
      status: 'ERROR: Codigo duplicado',
      msg: `El codigo ${reqProduct.code} ya existe en otro producto de la base de datos`
    });
  }

  return res.send({
    status: 'success',
    msg: `El producto con id ${pid} fue modificado`
  });
});

// Eliminar producto
router.delete("/:id", async (req, res) => {
  const pid = req.params.id;
  const deleteProduct = await dao.deleteProduct(pid);

  if (deleteProduct.deletedCount === 0) {
    return res.status(404).send({
      status: 'ERROR: inexistente',
      msg: `El producto con id ${pid} no existe`
    });
  }
  return res.send({
    status: 'success',
    msg: `El producto con id ${pid} fue eliminado`
  });
});

export default router;
