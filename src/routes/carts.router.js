import { Router } from "express";
import Cartmanager from "../manager/CartManager.js";

const router = Router();
const manager = new Cartmanager('./data/cart.json')


router.get('/', async (req, res) => {
   const carts = await manager.getCartProducts();

   res.send({
      carts
   });
});


router.get('/:id', async (req, res) => {
   const idCart = req.params.id;
   const cart = await manager.getCartProductById(idCart);

   res.send({
      cart
   });
});


router.post('/', async (req, res) => {
   const cart = await manager.createCart();

   res.send({
      status:'success',
      cart
   });
});


router.post('/:cid/product/:pid', async (req, res) => {
   const idCart = req.params.cid;
   const idProduct = req.params.pid;

   const addedProdut = await manager.addProductCart(idCart, idProduct);

   if (addedProdut.exists === false) {
      return res.status(404).send({
         status: 'ERROR',
         msg: `El carrito con id ${idCart} no existe`
      });
   }
   return res.send({
      status: 'success',
      addedProdut
   });
});


export default router;
