export default class ProductRepository{
   constructor(dao){
      this.dao = dao;
   }

   getAllProducts = async (limit, page, query, sort) => {
      return await this.dao.getProducts(limit, page, query, sort);
   }

   getProductById = async (pid) => {
      return await this.dao.getProductById(pid);
   }  

   addProduct = async (product) => {
      return await this.dao.addProduct(product);
   }

   updateCart = async (pid, product) => {
      return await this.dao.updateCart(pid, product);
   }

   deleteProduct = async (pid) => {
      return await this.dao.deleteProduct(pid);
   }

}