
const addToCart = document.getElementById('addToCart');
const idProduct = document.getElementById('idProduct');

let cartId = '';

async function getCartId() {
await fetch('/api/carts', {
   method: 'POST',
}).then(res => res.json())
   .then(data => {
      cartId = data.cart._id;
   })
}

getCartId();

addToCart.addEventListener('click', (e) => {
   
   console.log(idProduct.value.toString());

   const url = `/api/carts/${cartId}/product/${idProduct.value.toString()}`;
   
   fetch(url, {
      method: 'POST',
   }
   ).then(res => res.json())
   .then(data => {
     (data.status) === 'success' ? alert('Producto agregado al carrito') : alert('Error al agregar producto al carrito');
   })
});
