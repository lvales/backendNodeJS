import express from 'express';
import productManager from '../manager/ProductManager.js';

const PORT = 8080;
const app = express();
const manager = new productManager('./data/products.json');


app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
   console.log(`Server running at port ${PORT}`);
});


app.get('/api/products', async (req, res) => {

   const limit = req.query.limit;
   const idProduct = req.query.pid;

   if (limit) {
      const products = await manager.getProducts();
      const productsLimit = products.slice(0, limit);
      return res.send({
         products: productsLimit
      })
   }

   if (idProduct) {
      const product = await manager.getProductById(idProduct);
      return res.send({
         product
      })
   }

   const products = await manager.getProducts();
   return res.send({
      products
   })

});


