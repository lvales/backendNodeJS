import CartDao from "../dao/manager/mongoDb/CartDao.js";
import ProductDao from "../dao/manager/mongoDb/ProductDao.js";


const productDao = new ProductDao();
const cartDao = new CartDao();

class ViewController {
   // Página de inicio de sesión
   getHome = async (req, res) => {
      res.render('login');
   }
   // Página de registro
   getRegister = async (req, res) => {
      res.render('register');
   }
   // Página para restablecer contraseña
   getrefreshPass = async (req, res) => {
      res.render('resetPassword');
   }
   // Página de perfil
   getProfile = async (req, res) => {
      res.render('profile', {
         user: req.session.user
      });
   }
   // Ruta para agregar y eliminar productos
   getRealTimeProducts = (req, res) => {
      res.render('realTimeProducts', {});
   }
   // Ruta para ver productos
   getViewProducts = async (req, res) => {
      const limit = req.query.limit || 3;
      const query = req.query.query || '';
      const sort = req.query.sort || 'desc';
      const page = req.query.page || 1;

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
   }
   // Ruta para ver carrito
   getViewCart = async (req, res) => {
      const cart = await cartDao.getCartById(req.params.cid);
      const products = cart.products;
      if (cart.exists === false) {
         return res.status(404).send({
            status: 'ERROR',
            msg: `El carrito con id ${req.params.cid} no existe`
         });
      }
      res.render('cartId', { products });
   }
   // Ruta de chat
   getChat = (req, res) => {
      res.render('chat', {});
   }
}

export default ViewController;
