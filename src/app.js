import express from 'express';
import productManager from './manager/ProductManager.js';

const PORT = 8080;
const app = express();
const manager = new productManager('./data/products.json');


app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
   console.log(`Server running at port ${PORT}`);
});


app.get('/api/products', async (req, res) => {

   const limit = req.query.limit;
   const products = await manager.getProducts();

   if (limit) {
      const productsLimit = products.slice(0, limit);
      return res.send({
         products: productsLimit
      })
   }
   return res.send({
      products: products
   })
});

app.get('/api/products/:id', async( req, res ) => {
   
   const idProduct = req.params.id;
   
   if (idProduct) {
      const product = await manager.getProductById(idProduct);
      return res.send({
         products: product
      })
   }
});
