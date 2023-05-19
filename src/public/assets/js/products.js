
window.onload = function () {

   const addToCart = document.getElementsByName('addToCart');
   // const idProduct = document.getElementsByName('idProduct');
   const viewCart = document.getElementById('viewCart');

   let cartId = sessionStorage.getItem('cartId');
   let productId = '';
   let url = '';

   // Recorre todos los botones de agregar al carrito y les agrega un evento
   addToCart.forEach((element, i) => {
      element.addEventListener('click', (e) => {
         e.preventDefault();
         productId = document.getElementsByName('addToCart')[i].id;
         cartId ? addProductToCart(cartId) : getCartId();
      }, false);
   });

   // Agrega un evento al botón de ver carrito
   viewCart.addEventListener('click', (e) => {
      e.preventDefault();
      const url = `/carts/${cartId}`;
      window.location.href = url;
   });

   // Crea el cartId y lo guarda en sessionStorage para usarlo en el carrito
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

   // Agrega el producto al carrito con el cartId y productId   
   async function addProductToCart(cartId) {
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
