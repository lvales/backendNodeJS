import { Router } from "express";
import ProductManager from "../manager/ProductManager.js";
import { uploader } from "../utils.js";

const router = Router();
const manager = new ProductManager("./data/products.json");


router.get("/", async (req, res) => {
  const limit = req.query.limit;
  const products = await manager.getProducts();

  if (limit) {
    const productsLimit = products.slice(0, limit);
    return res.send({
      status: 'success',
      products: productsLimit,
    });
  }
  return res.send({
    products: products,
  });
});


router.get("/:id", async (req, res) => {

  const idProduct = req.params.id;
  const product = await manager.getProductById(idProduct);

  if(product.exists === false){
    return res.status(404).send({
      status: 'ERROR',
      msg: `El producto con id ${idProduct} no existe.`
    });
  }

  return res.send({
    status: 'success',
    products: product,
  });

});


router.post("/", uploader.single("thumbnail"), async (req, res) => {

  const reqProduct = req.body;
  const filename = req.file.filename;

  reqProduct.thumbnail = [`http://localhost:8080/images/${filename}`];

  const product = await manager.addProduct(reqProduct);

  if (product.incomplete === true) {
    return res.status(409).send({
      status: 'ERROR',
      msg: 'Producto incompleto, faltan parametros'
    });
  }

  if (product.duplicate === true) {
    return res.status(409).send({
      status: 'ERROR',
      msg: 'El codico de producto ya exixte'
    });
  }
  return res.send({
    status: 'success',
    product
  });
});


router.put("/:id", async (req, res) => {

  const reqProduct = req.body;
  const id = req.params.id;

  const updateProduct = await manager.updateProducts(id, reqProduct);

  if (updateProduct.exists === false) {
    return res.status(404).send({
      status: 'ERROR',
      msg: `El producto con id ${id} no existe`
    });
  }
  return res.send({
    status: 'success',
    updateProduct
  });
});


router.delete("/:id", async (req, res) => {

  const id = req.params.id;

  const deleteProduct = await manager.deleteProduct(id);

  if (deleteProduct.exists === false) {
    return res.status(404).send({
      status: 'ERROR',
      msg: `El producto con id ${id} no existe`
    });
  }
  return res.send({
    status: 'success',
    deleteProduct
  });
});

export default router;
