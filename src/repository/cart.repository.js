export default class CartRepository {
   constructor(dao) {
      this.dao = dao;
   }

   getAllCarts = async () => {
      return await this.dao.getAllCarts();
   }

   getCartById = async (cid) => {
      return await this.dao.getCartById(cid);
   }

   createCart = async () => {
      return await this.dao.createCart();
   }

   addToCart = async (cid, pid) => {
      return await this.dao.addToCart(cid, pid);
   }

   updateCart = async (cid, products) => {
      return await this.dao.updateCart(cid, products);
   }

   deleteCart = async (cid) => {
      return await this.dao.deleteCart(cid);
   }

   quantityProduct = async (cid, pid, quantity) => {
      return await this.dao.quantityProduct(cid, pid, quantity);
   }

   deleteProductFromCart = async (cid, pid) => {
      return await this.dao.deleteProductFromCart(cid, pid);
   }

   deleteAllProductsFromCartCart = async (cid) => {
      return await this.dao.deleteAllProductsFromCartCart(cid);
   }
}