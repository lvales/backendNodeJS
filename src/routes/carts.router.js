import { Router } from "express";
import Cartmanager from "../manager/CartManager.js";

const router = Router();
const manager = new Cartmanager('./data/cart.json')

// Rutas
// Obtener todos los carritos
router.get('/', async (req, res) => {
   const carts = await manager.getCartProducts();

   res.send({
      carts
   });
});

// Obtener carrito por id
router.get('/:id', async (req, res) => {
   const idCart = req.params.id;
   const cart = await manager.getCartProductById(idCart);

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
   const cart = await manager.createCart();

   res.send({
      status:'success',
      cart
   });
});

// Agregar al carrito
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
