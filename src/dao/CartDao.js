import CartModule from './models/cart.model.js';
import ProductDao from './ProductDao.js';

const productDao = new ProductDao();

export default class CartDao {
   // Métodos
   getCartProducts = async () => {
      try {
         const result = await CartModule.find().lean();
         return result;
      } catch (error) {
         console.log(error);
      }
   }

   getCartProductById = async (cid) => {
      try {
         const result = await CartModule.findOne({ _id: cid });
         return result;
      } catch (error) {
         console.log(error);
      }
   }

   createCart = async () => {
      const cartProduct = {
         "products": []
      }
      try {
         const result = await CartModule.create(cartProduct);
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
      
      const result = cartProduct.products.find(e => e.product.toString() === pid);
      // Si no existe el producto en el carrito, lo agrega
      if (!result || result.product.toString() !== pid) { 
         cartProduct.products.push({
            product: existProduct._id,
            quantity: 1
         });
      } else {
         // Si existe el producto, aumenta la cantidad
         result.quantity += 1;
      }

      cartProduct.updatedAt = Date.now();

      try {
         const result = await CartModule.updateOne({ _id: cid }, cartProduct);
         return result;

      } catch (error) {
         console.log(error);
      }
   }
}
