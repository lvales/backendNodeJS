import { Router } from "express";
import ProductDao from "../dao/mongoDb/ProductDao.js";
import CartDao from "../dao/mongoDb/CartDao.js";

const router = Router();
const productDao = new ProductDao();
const cartDao = new CartDao();

// Middelwares
const publicAccess = (req, res, next) => {
  if (req.session.user) return res.redirect('/products');
  next();
}

const privateAccess = (req, res, next) => {
  if (!req.session.user) return res.redirect('/');
  next();
}

const adminAcces = (req, res, next) => {
  if (req.session.user.rol !== 'admin') return res.redirect('/');
  next();
}

// View routes
// Home login
router.get('/', publicAccess, async (req, res) => {
  res.render('login');
});

// Register
router.get('/register', publicAccess, async (req, res) => {
  res.render('register');
});

// Reset password
router.get('/resetPassword', publicAccess, async (req, res) => {
  res.render('resetPassword');
});

// Profile
router.get('/profile', privateAccess, async (req, res) => {
  res.render('profile', {
    user: req.session.user
  });
});

// Route para agregar y eliminar productos
router.get('/realtimeproducts', adminAcces, (req, res) => {
  res.render('realTimeProducts', {});
});

// Route para vizualizar productos 
router.get('/products', privateAccess, async (req, res) => {
  const limit  = req.query.limit || 3;
  const  query = req.query.query || '';
  const sort   = req.query.sort || 'desc';
  const page   = req.query.page || 1;

  const { products, prevPage, nextPage, hasPrevPage, hasNextPage } = await productDao.getProducts(limit, page, query, sort);
  const actualPage = parseInt(nextPage) - 1 || parseInt(prevPage) + 1;

  res.render('products', {
    products,
    actualPage,
    prevPage,
    nextPage,
    hasPrevPage,
    hasNextPage,
    user: req.session.user
  });
});

// Route para vizualizar carrito
router.get('/carts/:cid', privateAccess, async (req, res) => {
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
router.get('/chat', privateAccess, (req, res) => {
  res.render('chat', {});
});

export default router;
