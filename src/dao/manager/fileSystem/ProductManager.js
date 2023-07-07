import fs from 'fs';

export default class ProductManager {

  constructor(path) {
    this.path = path;
  };

  // Métodos
  getProducts = async () => {
    if (!fs.existsSync(this.path)) return [];

    try {
      const products = await fs.promises.readFile(this.path, 'utf-8');
      const productsJson = JSON.parse(products);
      return productsJson;
    } catch (error) {
      console.log(error);
    }
  };

  getProductById = async (idProduct) => {
    const products = await this.getProducts();
    const product = products.find(product => product.id === parseInt(idProduct));

    if (!product) {
      return {
        exists: false
      }
    }
    return product;
  };

  addProduct = async (product) => {
    if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category) {
      return {
        incomplete: true
      }
    }

    const products = await this.getProducts();

    let isDuplicate = products.find(e => e.code === product.code);

    if (isDuplicate) {
      return {
        duplicate: true
      }
    };

    if (products.length === 0) {
      product.id = 1;
      product.status = true;
    } else {
      product.id = products[products.length - 1].id + 1;
    };

    products.push(product);

    try {
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'), 'utf-8');
      return product;

    } catch (error) {
      console.log(error);
    }
  };

  updateCarts = async (id_product, updateCart) => {
    const products = await this.getProducts();
    const id = parseInt(id_product);
    const index = products.findIndex(e => e.id === id);

    if (index === -1) {
      return {
        exists: false
      }
    }

    updateCart.id = id;

    products[index] = { ...products[index], ...updateCart };

    try {
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'), 'utf-8');
      return updateCart;

    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (id_product) => {
    const products = await this.getProducts();
    const id = parseInt(id_product);
    const index = products.findIndex(e => e.id === id);
    const removedProduct = products[index];

    if (index === -1) {
      return {
        exists: false
      }
    }

    const newProducts = products.filter(product => product.id !== id);

    try {
      await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, '\t'), 'utf-8');
      return removedProduct;

    } catch (error) {
      console.log(error);
    }
  };
}
