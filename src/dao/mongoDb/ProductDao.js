import ProductModule from './models/product.model.js';

export default class ProductDao {

   // Metodos
   getProducts = async (limit, page, query, sort) => {

      const param = {};
      query ? param.category = query : null;

      try {
         const { docs, totalPage, prevPage, nextPage, hasPrevPage, hasNextPage } = await ProductModule.paginate(param, { limit, page, sort: { price: sort }, lean: true });
         const products = docs;
         if (products.length === 0) return { exists: false };
         return {
            products,
            totalPage,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
         }
      } catch (error) {
         console.log(error);
      }
   }

   getProductById = async (pid) => {
      try {
         const product = await ProductModule.findOne({ _id: pid });
         if (!product) return { exists: false };
         return product;
      } catch (error) {
         console.log(error);
      }
   }

   addProduct = async (product) => {

      const { title, description, code, price, stock, category, thumbnail, status } = product;
      // Valida que no falte ningun campo
      if (!title || !description || !code || !price || !stock || !category) {
         return { incomplete: true };
      }
      // Valida que no exista un producto con el mismo codigo
      let isDuplicate = await ProductModule.find({ code: code });
      if (isDuplicate.length > 0) {
         return {
            duplicate: true
         }
      }

      const newProduct = {
         title,
         description,
         code,
         price,
         stock,
         category,
         thumbnail,
         status: status || true,
      }

      try {
         const result = await ProductModule.create(newProduct);
         return result;
      } catch (error) {
         console.log(error);
      }
   }

   updateProduct = async (pid, product) => {
      // Valida que no exista un producto con el mismo codigo
      let isDuplicateCode = await ProductModule.find({ code: product.code });
      if (isDuplicateCode.length > 0) {
         return {
            duplicate: true
         }
      }
      // Actualiza el producto
      const updateProduct = { ...product, updatedAt: new Date().toLocaleString() };

      try {
         const result = await ProductModule.updateOne({ _id: pid }, { $set: updateProduct });
         return result;
      } catch (error) {
         console.log(error);
      }
   }

   deleteProduct = async (pid) => {
      try {
         const result = await ProductModule.deleteOne({ _id: pid });
         return result;
      } catch (error) {
         console.log(error);
      }
   }
}
