import fs from 'fs';


export default class ProductManager {

   constructor(path) {
      this.path = path;
   }

   isRequired() {
      throw new Error ('Error: todos los parametros son requeridos');  
   }

   getProducts = async () => {
      
      if(!fs.existsSync(this.path)){
         return [];
      }

      try {
         const products = await fs.promises.readFile(this.path, 'utf-8');
         const productsJson = JSON.parse(products);
         return productsJson;

      } catch (error) {
         console.log(error);
      }
   }

   getProductById = async (idProduct = this.isRequired()) => {

      const products = await this.getProducts();
      
      let product = products.find(product => product.id === parseInt(idProduct));

      if(!product){
         return 'Error: el producto no existe';
      }
      return product;
   }

   addProduct = async (product = this.isRequired()) => {

      let products = await this.getProducts();

      if (products.length === 0) {
         product.id = 1;
      } else {
         product.id = products[products.length - 1].id + 1;
      }

      let isCode = products.find(e => e.code === product.code);

      if (isCode) {
         return `Error: el producto ${isCode.code} ya existe`;
      }

      products.push(product);

      try {
         await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'), 'utf-8');         
         return product;

      } catch (error) {
         console.log(error);
      }
   }

   updateProducts = async (id_product, updateProduct) => {

      let products = await this.getProducts();

      let index = products.findIndex(e => e.id === id_product);

      if (index === -1) {
         return 'Error: el producto no existe';
      } 

      updateProduct.id = id_product;

      products[index] = {...products[index], ...updateProduct};

      try {
         await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'), 'utf-8');         
         return products;

      } catch (error) {
         console.log(error);
      } 
   }

   deleteProduct = async (id_product) => {

      let products = await this.getProducts();

      let index = products.findIndex(e => e.id === id_product);

      if (index === -1) {
         return 'Error: el producto no existe';
      } 

      const removedProducts = products.filter(product => product.id !== id_product);
      
      try {
         await fs.promises.writeFile(this.path, JSON.stringify(removedProducts, null, '\t'), 'utf-8');         
         return removedProducts;

      } catch (error) {
         console.log(error);
      }     
   }
}
