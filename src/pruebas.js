import cartManager from "./manager/CartManager.js";


const manager =  new cartManager('./data/cart.json');

const y = async () => {
  // const x = await manager.createCart();
  const x = await manager.getCartProductById(2);

  // const x = await manager.addProductCart(2, 1);
  console.log(x);
}

y();
