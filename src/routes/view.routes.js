import { Router } from "express";
import ProductDao from "../dao/mongoDb/ProductDao.js";
import CartDao from "../dao/mongoDb/CartDao.js";

const router = Router();
const productDao = new ProductDao();
const cartDao = new CartDao();

 // Middlewares
// Verifica si el usuario no ha iniciado sesión
const publicAccess = (req, res, next) => {
  if (req.session.user) return res.redirect('/products');
  next();
};
 // Verifica si el usuario ha iniciado sesión
const privateAccess = (req, res, next) => {
  if (!req.session.user) return res.redirect('/');
  next();
};
 // Verifica si el usuario tiene acceso de administrador
const adminAccess = (req, res, next) => {
  if (req.session.user.rol !== 'admin') return res.redirect('/products');
  next();
};

 // Rutas de vista
// Página de inicio de sesión
router.get('/', publicAccess, async (req, res) => {
  res.render('login');
});
 // Página de registro
router.get('/register', publicAccess, async (req, res) => {
  res.render('register');
});
 // Página para restablecer contraseña
router.get('/resetPassword', publicAccess, async (req, res) => {
  res.render('resetPassword');
});
 // Página de perfil
router.get('/profile', privateAccess, async (req, res) => {
  res.render('profile', {
    user: req.session.user
  });
});
 // Ruta para agregar y eliminar productos
router.get('/realtimeproducts', adminAccess, (req, res) => {
  res.render('realTimeProducts', {});
});
 // Ruta para ver productos
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
 // Ruta para ver carrito
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
 // Ruta de chat
router.get('/chat', privateAccess, (req, res) => {
  res.render('chat', {});
});

export default router;
