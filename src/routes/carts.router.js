import { Router } from "express";
import CartDao from "../dao/mongoDb/CartDao.js";

const router = Router();
const dao = new CartDao();

// Rutas
// Obtener todos los carritos
router.get('/', async (req, res) => {
   const carts = await dao.getCartProducts();
   if (carts.exists === false) {
      return res.status(404).send({
         status: 'ERROR',
         msg: 'No hay carritos en la base de datos para mostrar'
      });
   }
   res.send({
      carts
   });
});

// Obtener carrito por id
router.get('/:cid', async (req, res) => {
   const idCart = req.params.cid;
   const cart = await dao.getCartProductById(idCart);

   if(cart.exists === false){
      return res.status(404).send({
         status: 'ERROR',
         msg: `El carrito con id ${idCart} no existe`
      });
   } 
   res.send({
      cart
   });
});

// Crear carrito
router.post('/', async (req, res) => {
   const cart = await dao.createCart();

   res.send({
      status:'success',
      cart
   });
});

// Agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
   const idCart = req.params.cid;
   const idProduct = req.params.pid;
   const addedProdut = await dao.addProductCart(idCart, idProduct);

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
});

// Actualizar productos del carrito
router.put('/:cid', async (req,res) => {
   const idCart = req.params.cid;
   const products = req.body
   
   const result = await dao.updateProduct(idCart, products);

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
});

// Actualizar cantidad de un producto del carrito 
router.put('/:cid/product/:pid', async (req,res) => {
   const idCart = req.params.cid;
   const idProduct = req.params.pid;
   const quantity = req.query.quantity;

   const result = await dao.updateProductQuantity(idCart, idProduct, quantity);
   return res.send({
      status: 'success',
      msg: `El producto con id ${idProduct} se actualizo la cantidad en el carrito con id ${idCart}`
   });
});


// Eliminar productos del carrito
router.delete('/:cid/product/:pid', async (req,res) => {
   const idCart = req.params.cid;
   const idProduct = req.params.pid;

   const result = await dao.deleteProductById(idCart, idProduct)

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
})

// Eliminar todos los productos de un carrito
router.delete('/:cid', async (req,res) => {
   const idCart = req.params.cid;

   const result = await dao.deleteAllProduct(idCart)

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
})


export default router;
