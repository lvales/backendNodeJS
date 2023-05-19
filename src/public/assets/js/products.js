
window.onload = function () {

   const addToCart = document.getElementsByName('addToCart');
   // const idProduct = document.getElementsByName('idProduct');
   const viewCart = document.getElementById('viewCart');

   let cartId = sessionStorage.getItem('cartId');
   let productId = '';
   let url = '';

   
   addToCart.forEach((element, i) => {
      element.addEventListener('click', (e) => {
         e.preventDefault();
         productId = document.getElementsByName('addToCart')[i].id;
         cartId ? addProductToCart(cartId) : getCartId();
      }, false);
   });

   viewCart.addEventListener('click', (e) => {
      e.preventDefault();
      const url = `/carts/${cartId}`;
      window.location.href = url;
   });

   async function getCartId() {
      await fetch('/api/carts', {
         method: 'POST',
      }).then(res => res.json())
         .then(data => {
            cartId = data.cart._id;
            sessionStorage.setItem('cartId', cartId);
            addProductToCart(cartId);
         })
   }

   
   async function addProductToCart(cartId) {
      console.log('addProductToCart');
      url = `/api/carts/${cartId}/product/${productId.toString()}`;
      await fetch(url, {
         method: 'POST',
      }
      ).then(res => res.json())
         .then(data => {
            (data.status) === 'success' ? alert('Producto agregado al carrito') : alert('Error al agregar producto al carrito');
         })
   }
}
