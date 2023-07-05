
window.onload = function () {

   const addToCart = document.getElementsByName('addToCart');
   const viewCart = document.getElementById('viewCart');
   const cid = document.getElementById('uid');

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

   // Obtiene el cartId con el UserId y agrega el producto al carrito
   async function getCartId() {
      const url = `/api/carts/${cid.value}`;
      await fetch(url, {
         method: 'GET',
      }).then(res => res.json())
         .then(data => {  
            cartId = data.cart._id;
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
