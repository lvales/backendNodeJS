import { v4 as uuidv4 } from 'uuid';
import { cartServices } from '../repository/index.js';
import { ticketServices } from '../repository/index.js';
import { productServices } from '../repository/index.js';   


class CartsController {
   // Obtener todos los carritos
   getAllCarts = async (req, res) => {
      const carts = await cartServices.getAllCarts();

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
      const cart = await cartServices.getCartById(idCart);

      if (cart.exists === false) {
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
      const cart = await cartServices.createCart();

      if (cart.status === false) {
         return res.status(500).send({
            status: 'ERROR',
            msg: 'No se pudo crear el carrito'
         });
      }

      res.send({
         status: 'success',
         cart
      });
   }
   // Agregar producto al carrito
   addToCart = async (req, res) => {
      const idCart = req.params.cid;
      const idProduct = req.params.pid;
      const addedProdut = await cartServices.addToCart(idCart, idProduct);
      // Valida que exista el carrito
      if (addedProdut.existCart === false) {
         return res.status(404).send({
            status: 'ERROR',
            msg: `El carrito con id ${idCart} no existe`
         });
      }
      // Valida que exista el producto
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
   updateCart = async (req, res) => {
      const idCart = req.params.cid;
      const products = req.body

      const result = await cartServices.updateCart(idCart, products);
      // Valida que exista el carrito
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
   quantityProduct = async (req, res) => {
      const idCart = req.params.cid;
      const idProduct = req.params.pid;
      const quantity = req.body.quantity;

      await cartServices.quantityProduct(idCart, idProduct, quantity);
      return res.send({
         status: 'success',
         msg: `El producto con id ${idProduct} se actualizo la cantidad en el carrito con id ${idCart}`
      });
   }
   // Eliminar productos del carrito
   deleteProductFromCart = async (req, res) => {
      const idCart = req.params.cid;
      const idProduct = req.params.pid;

      const result = await cartServices.deleteProductFromCart(idCart, idProduct)
      // Valida que exista el carrito
      if (result.existCart === false) {
         return res.status(400).send({
            status: 'ERROR',
            msg: `El carrito con id ${idCart} no existe`
         });
      }
      // Valida que exista el producto
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
   deleteAllProductsFromCartCart = async (req, res) => {
      const idCart = req.params.cid;

      const result = await cartServices.deleteAllProductsFromCart(idCart)
      // Valida que exista el carrito
      if (result.existCart === false) {
         return res.status(400).send({
            status: 'ERROR',
            msg: `El carrito con id ${idCart} no existe`
         });
      }
      // Valida que exista el producto
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

   purchaseCart = async (req, res) => {
      const idCart = req.params.cid;
      const cart = await cartServices.getCartById(idCart);
      const products = cart.products;
      const productsOutOfStock = [];
      let amount = 0;

      // Valida que exista el carrito y productos
      if (cart.exists === false) {
         return res.status(404).send({
            status: 'ERROR',
            msg: `El carrito con id ${idCart} no existe`
         });
      }

      if (products.length === 0) {
         return res.status(404).send({
            status: 'ERROR',
            msg: `El carrito con id ${idCart} no tiene productos`
         });
      }
      
      // Valida que los productos tengan stock y los resta del stock
      for (const obj of products) {
         if (obj.quantity <= obj.product.stock) {
            const product = await productServices.getProductById(obj.product._id.toString());
            product.stock -= obj.quantity;
            amount += obj.quantity * obj.product.price;
            await productServices.updateCart(obj.product._id.toString(), product);
            await cartServices.deleteProductFromCart(idCart, obj.product._id.toString());
         } else {
            productsOutOfStock.push(obj.product._id.toString());
         }
      }

      console.log(req.session);
      // Genera un ticket con los productos comprados
      const ticket = {
         code: uuidv4(),
         amount,
         purchaser: req.user.email,
      }
      const ticketCreated = await ticketServices.createTicket(ticket);

      // Si hay productos sin stock, devuelve un mensaje con los productos
      if (productsOutOfStock.length > 0) {
         return res.send({
            status: 'Sin Stock',
            products: productsOutOfStock
         });
      }

      return res.send({
         status: 'success',
         msg: `Compra realizada con exito`,
         ticket: ticketCreated,
      });
   }
}

export default CartsController;