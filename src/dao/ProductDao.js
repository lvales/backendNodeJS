import ProductModule from './models/product.model.js';

export default class ProductDao {

   // Metodos
   getProducts = async () => {
      try {
         const products = await ProductModule.find().lean();
         return products;
      } catch (error) {
         console.log(error);
      }
   }

   getProductById = async (pid) => {
      try {
         const product = await ProductModule.findOne({ pid: pid });
         return product;
      } catch (error) {
         console.log(error);
      }
   }

   addProduct = async (product) => {

      const { title, description, code, price, stock, category, thumbnail, status } = product;

      // Valida que no falte ningun campo
      if (!title || !description || !code || !price || !stock || !category) {
         return {
            incomplete: true
         }
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

      // Asigna id al nuevo producto
      const data = await this.getProducts();
      if (data.length === 0) {
         newProduct.pid = 1;
      } else {
         newProduct.pid = data[data.length - 1].pid + 1;
      };

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
         const result = await ProductModule.updateOne({ pid: pid }, { $set: updateProduct });
         return result;
      } catch (error) {
         console.log(error);
      }
   }

   deleteProduct = async (pid) => {
      try {
         const result = await ProductModule.deleteOne({ pid: pid });
         return result;
      } catch (error) {
         console.log(error);
      }
   }
}
