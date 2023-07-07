import CartModel from '../../models/cart.model.js';
// import CartModule from './models/cart.model.js';
import ProductDao from './ProductDao.js';

const productDao = new ProductDao();

export default class CartDao {
   // Métodos
   // Obtener todos los carritos
   getAllCarts = async () => {
      try {
         const result = await CartModel.find().populate('products.product').lean();
         if (result.length === 0) return { exists: false };
         return result;
      } catch (error) {
         console.error('Error al obtener el carrito:', error);
         throw error;
      }
   }

   // Obtener un carrito por id
   getCartById = async (cid) => {
      try {
         const result = await CartModel.findOne({ _id: cid }).populate('products.product').lean();
         if (result === null) return { exists: false };
         return result;
      } catch (error) {
         console.error('Error al obtener el carrito:', error);
         return { exists: false };
      }
   }

   // Crear un carrito
   createCart = async () => {
      const cartProduct = {
         "products": []
      }
      try {
         const result = await CartModel.create(cartProduct);
         return result;
      } catch (error) {
         console.log(error);
         return { status: false };
      }
   };

   // Agregar un producto al carrito
   addToCart = async (cid, pid) => {
      // Valida que exista el carrito y el producto
      const cartProduct = await this.getCartById(cid);
      const existProduct = await productDao.getProductById(pid);
      if (!cartProduct) return { existCart: false }
      if (!existProduct) return { existProduct: false }

      const result = cartProduct.products.find(e => e.product._id.toString() === pid);

      // Si no existe el producto en el carrito, lo agrega
      if (!result) {
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
         const result = await CartModel.updateOne({ _id: cid }, cartProduct);
         return result;

      } catch (error) {
         console.log(error);
      }
   }

   // Eliminar todos los productos del carrito
   deleteAllProductsFromCart = async (cid) => {
      // Valida que exista el carrito
      const cartProduct = await this.getCartById(cid);
      if (!cartProduct) return { existCart: false }
      const result = cartProduct.products.length

      // Elimina todos los productos del carrito
      if (result > 0) {
         const result = await CartModel.updateOne({ _id: cid }, { $pull: { products: {} } })
         return result;
      } else {
         return { existProduct: false }
      }
   }

   // Eliminar un producto del carrito por id
   deleteProductFromCart = async (cid, pid) => {
      // Valida que exista el carrito y el producto
      const cartProduct = await this.getCartById(cid);
      if (!cartProduct) return { existCart: false }
      const result = cartProduct.products.find(e => e.product._id.toString() === pid);

      // Si existe el producto en el carrito lo elimina
      if (result) {
         const result = await CartModel.updateOne({ _id: cid }, { $pull: { products: { product: pid } } });
         return result;
      } else {
         return { existProduct: false }
      }
   }

   // Cargar array de productos al carrito por id
   updateCart = async (cid, products) => {
      // Valida que exista el carrito y el producto
      const cartProduct = await this.getCartById(cid);
      if (!cartProduct) return { existCart: false }

      // Insertar array de productos
      products.forEach(async (e) => {
         cartProduct.products.push(e);
      });
      cartProduct.updatedAt = Date.now();

      try {
         const result = await CartModel.updateOne({ _id: cid }, cartProduct);
         return result;

      } catch (error) {
         console.log(error);
      }
   }

   // Actualizar la cantidad de un producto del carrito por id
   quantityProduct = async (cid, pid, quantity) => {
      // Valida que exista el carrito y el producto
      const cartProduct = await this.getCartById(cid);
      if (!cartProduct) return { existCart: false }
      const result = cartProduct.products.find(e => e.product._id.toString() === pid);

      if (result) {
         const result = await CartModel.updateOne({ _id: cid, "products.product": pid }, { $set: { "products.$.quantity": quantity } });
         return result;
      } else {
         return { existProduct: false }
      }
   }
}
