import CartModule from './models/cart.model.js';
import ProductDao from './ProductDAO.js';

const productDao = new ProductDao();

export default class CartDao {
   // Métodos
   getCartProducts = async () => {
      s
      try {
         const result = await CartModule.find().lean();
         return result;
      } catch (error) {
         console.log(error);
      }
   }

   getCartProductById = async (cid) => {
      try {
         const result = await CartModule.findOne({ cid: cid });
         return result;
      } catch (error) {
         console.log(error);
      }
   }

   createCart = async () => {
      const cartProduct = {
         "products": []
      }

      // Asigna id al nuevo carrito
      const cartProducts = await this.getCartProducts();
      if (cartProducts.length === 0) {
         cartProduct.cid = 1;
      } else {
         cartProduct.cid = cartProducts[cartProducts.length - 1].cid + 1;
      };

      cartProducts.push(cartProduct);

      try {
         const result = await CartModule.create(cartProducts);
         return result;
      } catch (error) {
         console.log(error);
      }
   };


   addProductCart = async (cid, pid) => {
      const cartProduct = await this.getCartProductById(cid);
      const existProduct = await productDao.getProductById(pid);

      // Valida que exista el carrito y el producto
      if (!cartProduct) return { existCart: false }
      if (!existProduct) return { existProduct: false }
      
      const product = cartProduct.products.find(e => e.pid === parseInt(pid));

      // Si no existe el producto en el carrito, lo agrega
      if (!product || product.pid !== parseInt(pid)) {
         cartProduct.products.push({
            pid: pid,
            quantity: 1
         });
      } else {
         // Si existe el producto, aumenta la cantidad
         console.log('Si existe el producto');
         product.quantity += 1;
      }

      cartProduct.updatedAt = Date.now();

      try {
         const result = await CartModule.updateOne({ cid: cid }, cartProduct);
         return result;

      } catch (error) {
         console.log(error);
      }
   }
}