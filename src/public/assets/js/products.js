
window.onload = function () {

   const addToCart = document.getElementsByName('addToCart');
   const idProduct = document.getElementById('idProduct');
   const viewCart = document.getElementById('viewCart');

   let cartId = sessionStorage.getItem('cartId');
   let url = '';

   addToCart.forEach(element => {
      element.addEventListener('click', (e) => {
         e.preventDefault();
         console.log('click');
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
      url = `/api/carts/${cartId}/product/${idProduct.value.toString()}`;
      await fetch(url, {
         method: 'POST',
      }
      ).then(res => res.json())
         .then(data => {
            (data.status) === 'success' ? alert('Producto agregado al carrito') : alert('Error al agregar producto al carrito');
         })
   }
}
