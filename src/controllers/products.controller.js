import { productServices } from "../repository/index.js";

class ProductsController {

  getAllProducts = async (req, res) => {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const query = req.query.query || '';
    const sort = req.query.sort || 'desc';

    const result = await productServices.getAllProducts(limit, page, query, sort);

    if (result.exists === false) {
      return res.status(404).send({
        status: 'ERROR',
        msg: 'No hay productos en la base de datos para mostrar con los parametros ingresados'
      });
    }
    return res.send({
      satus: 'success',
      payload: result
    });
  };

  getProductsById = async (req, res) => {
    const pid = req.params.pid;
    const product = await productServices.getProductById(pid);

    if (product.exists === false) {
      return res.status(404).send({
        status: 'ERROR',
        msg: `El producto con id ${pid} no existe.`
      });
    }

    return res.send({
      status: 'success',
      products: product,
    });
  }

  createProduct = async (req, res) => {
    const reqProduct = req.body;

    if (req.file) {
      const filename = req.file.filename;
      reqProduct.thumbnail = [`http://localhost:8080/images/${filename}`];
    };

    const product = await productServices.addProduct(reqProduct);

    // Producto duplicado
    if (product.duplicate === true) {
      return res.status(409).send({
        status: 'ERROR',
        msg: 'El codigo de producto ya exixte en la base de datos'
      });
    }

    return res.send({
      status: 'success',
      product
    });
  }

  updateCart = async (req, res) => {
    const reqProduct = req.body;
    const pid = req.params.pid;
  
    const updateCart = await productServices.updateCart(pid, reqProduct);
  
    if (updateCart.exists === false) {
      return res.status(404).send({
        status: 'ERROR',
        msg: `El producto con id ${id} no existe`
      });
    }
  
    return res.send({
      status: 'success',
      msg: `El producto con id ${pid} fue modificado`
    });
  }

  deleteProduct = async (req, res) => {
    const pid = req.params.pid;
    const deleteProduct = await dao.deleteProduct(pid);
  
    if (deleteProduct.deletedCount === 0) {
      return res.status(404).send({
        status: 'ERROR',
        msg: `El producto con id ${pid} no existe`
      });
    }
    return res.send({
      status: 'success',
      msg: `El producto con id ${pid} fue eliminado`
    });
  }

}

export default ProductsController;
