import { generateProduct } from '../utils.js';


class MockingProductsController {
   generateProducts = async (req, res) => {
      const quantity = req.params.qtty;
      const products = generateProduct(quantity);
      res.send({
         status: 'success',
         payload:{
            products: products
         }
      });
   }
}

export default MockingProductsController;