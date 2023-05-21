import { Router } from "express";
import ProductDao from "../dao/mongoDb/ProductDao.js";
import CartDao from "../dao/mongoDb/CartDao.js";

const router = Router();
const productDao = new ProductDao();
const cartDao = new CartDao();

// View routes
// Home logi
router.get('/', async (req, res) => {
  res.render('login', {

  });
});

// Register
router.get('/register', async (req, res) => {
  res.render('register', {

  });
});

// Profile
router.get('/profile', async (req, res) => {
  res.render('profile', {

  });
});

// Route para agregar y eliminar productos
router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', {});
});

// Route para vizualizar productos 
router.get('/products', async (req, res) => {
  const page = req.query.page || 1;
  const { products, prevPage, nextPage, hasPrevPage, hasNextPage } = await productDao.getProducts(3, page, '', 'asc');
  const actualPage = parseInt(nextPage) - 1 || parseInt(prevPage) + 1;
  res.render('products', {
    products,
    actualPage,
    prevPage,
    nextPage,
    hasPrevPage,
    hasNextPage
  });
});

// Route para vizualizar carrito
router.get('/carts/:cid', async (req, res) => {
  const cart = await cartDao.getCartProductById(req.params.cid);
  const products = cart.products;
  if (cart.exists === false) {
    return res.status(404).send({
      status: 'ERROR',
      msg: `El carrito con id ${req.params.cid} no existe`
    });
  }
  res.render('cartId', { products });
});


// Route chat
router.get('/chat', (req, res) => {
  res.render('chat', {});
});

export default router;
