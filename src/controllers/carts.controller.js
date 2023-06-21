import CartDao from "../dao/mongoDb/CartDao.js";


const cartDao = new CartDao;

class CartsController {
   // Obtener todos los carritos
   getAllCarts = async (req, res) => {
      const carts = await cartDao.getCartProducts();
      if (carts.exists === false) {
         return res.status(404).send({
            status: 'ERROR',
            msg: 'No hay carritos en la base de datos para mostrar'
         });
      }
      res.send({
         carts
      });
   }
   // Obtener carrito por id
   getCartById = async (req, res) => {
      const idCart = req.params.cid;
      const cart = await cartDao.getCartProductById(idCart);
   
      if(cart.exists === false){
         return res.status(404).send({
            status: 'ERROR',
            msg: `El carrito con id ${idCart} no existe`
         });
      } 
      res.send({
         cart
      });
   }
   // Crear carrito
   createCart = async (req, res) => {
      const cart = await cartDao.createCart();
      
      if (cart.status === false) {
         return res.status(400).send({
            status: 'ERROR',
            msg: 'No se pudo crear el carrito'
         });
      }
      res.send({
         status:'success',
         cart
      });
   }
   // Agregar producto al carrito
   addToCart = async (req, res) => {
      const idCart = req.params.cid;
      const idProduct = req.params.pid;
      const addedProdut = await cartDao.addProductCart(idCart, idProduct);
   
      if (addedProdut.existCart === false) {
         return res.status(404).send({
            status: 'ERROR',
            msg: `El carrito con id ${idCart} no existe`
         });
      }
      if (addedProdut.existProduct === false) {
         return res.status(404).send({
            status: 'ERROR',
            msg: `El producto con id ${idProduct} no existe`
         });
      }
      return res.send({
         status: 'success',
         msg: `El producto con id ${idProduct} se agregó al carrito con id ${idCart}`
      });
   }
   // Actualizar productos del carrito
   updateCart = async (req,res) => {
      const idCart = req.params.cid;
      const products = req.body
      
      const result = await cartDao.updateProduct(idCart, products);
   
      if (result.existCart === false) {
         return res.status(400).send({
            status: 'ERROR',
            msg: `El carrito con id ${idCart} no existe`
         });
      }
   
      return res.send({
         status: 'success',
         msg: `El carrito con id ${idCart} actualizo los productos`
      });
   }
   // Actualizar cantidad de un producto del carrito 
   quantityProductCart = async (req,res) => {
      const idCart = req.params.cid;
      const idProduct = req.params.pid;
      const quantity = req.body.quantity;
      
      const result = await cartDao.updateProductQuantity(idCart, idProduct, quantity);
      return res.send({
         status: 'success',
         msg: `El producto con id ${idProduct} se actualizo la cantidad en el carrito con id ${idCart}`
      });
   }
   // Eliminar productos del carrito
   deleteProductCart = async (req,res) => {
      const idCart = req.params.cid;
      const idProduct = req.params.pid;
   
      const result = await cartDao.deleteProductById(idCart, idProduct)
   
      if (result.existCart === false) {
         return res.status(400).send({
            status: 'ERROR',
            msg: `El carrito con id ${idCart} no existe`
         });
      }
      if (result.existProduct === false) {
         return res.status(400).send({
            status: 'ERROR',
            msg: `El producto con id ${idProduct} no existe`
         });
      }
      return res.send({
         status: 'success',
         msg: `El producto con id ${idProduct} se eliminó del carrito con id ${idCart}`
      });
   }
   // Eliminar todos los productos de un carrito
   deleteAllProductCart = async (req,res) => {
      const idCart = req.params.cid;
   
      const result = await cartDao.deleteAllProduct(idCart)
   
      if (result.existCart === false) {
         return res.status(400).send({
            status: 'ERROR',
            msg: `El carrito con id ${idCart} no existe`
         });
      }
      if (result.existProduct === false) {
         return res.status(400).send({
            status: 'ERROR',
            msg: `El carrito con id ${idCart} no tiene productos`
         });
      }
      return res.send({
         status: 'success',
         msg: `Todos los productos del carrito con id ${idCart} se eliminaron`
      });
   }

}

export default CartsController;