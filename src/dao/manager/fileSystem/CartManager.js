import fs from 'fs';

export default class CartManager {

  constructor(path) {
    this.path = path;
  };

  // Métodos
  getAllCarts = async () => {
    if (!fs.existsSync(this.path)) return []

    try {
      const cartProducts = await fs.promises.readFile(this.path, 'utf-8');
      const cartProductsJson = JSON.parse(cartProducts);
      return cartProductsJson;
    } catch (error) {
      console.log(error);
    }
  }

  getCartById = async (idCart) => {
    const cartProducts = await this.getAllCarts();
    const cartProduct = cartProducts.find(e => e.id === parseInt(idCart));

    if (!cartProduct) return { exists: false }

    return cartProduct;
  }

  createCart = async () => {
    const cartProduct = {
      "products": []
    }

    const cartProducts = await this.getAllCarts();

    if (cartProducts.length === 0) {
      cartProduct.id = 1;
    } else {
      cartProduct.id = cartProducts[cartProducts.length - 1].id + 1;
    };

    cartProducts.push(cartProduct);

    try {
      await fs.promises.writeFile(this.path, JSON.stringify(cartProducts, null, '\t'), 'utf-8');
      return cartProduct;

    } catch (error) {
      console.log(error);
    }
  };


  addToCart = async (idCart, idProduct) => {
    const cid = parseInt(idCart);
    const pid = parseInt(idProduct);
    const cartProducts = await this.getAllCarts();

    const cartProduct = cartProducts.find(e => e.id === cid);

    if (!cartProduct) return { exists: false }

    const product = cartProduct.products.find(e=>e.id === pid);

    if (!product || product.id !== pid) {
      cartProduct.products.push({
        id: pid,
        quantity: 1
      });
    } else {
      product.quantity += 1;
    }

    try {
      await fs.promises.writeFile(this.path, JSON.stringify(cartProducts, null, '\t'), 'utf-8');
      return cartProduct;

    } catch (error) {
      console.log(error);
    }
  }
}
