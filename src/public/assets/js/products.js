
window.onload = function () {

   const addToCart = document.getElementsByName('addToCart');
   const viewCart = document.getElementById('viewCart');
   const uid = document.getElementById('uid');

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

   // TODO Obtener el cartId con el UserId y agrega el producto al carrito
   async function getCartId() {
      console.log(uid.value);
      const url = `/api/users/${uid.value}`;
      await fetch(url, {
         method: 'GET',
      }).then(res => res.json())
         .then(data => {  
            cartId = data.user.cartId;
            addProductToCart(cartId);
         })
      }	


   // async function getCartId() {
   //    await fetch('/api/carts', {
   //       method: 'POST',
   //    }).then(res => res.json())
   //       .then(data => {
   //          cartId = data.cart._id;
   //          sessionStorage.setItem('cartId', cartId);
   //          addProductToCart(cartId);
   //       })
   // }

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
