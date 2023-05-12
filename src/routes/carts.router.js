import { Router } from "express";
import CartDao from "../dao/mongoDb/CartDao.js";

const router = Router();
const dao = new CartDao();

// Rutas
// Obtener todos los carritos
router.get('/', async (req, res) => {
   const carts = await dao.getCartProducts();

   res.send({
      carts
   });
});

// Obtener carrito por id
router.get('/:id', async (req, res) => {
   const idCart = req.params.id;
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

// Agregar al carrito
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

export default router;
