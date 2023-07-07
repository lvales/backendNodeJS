
window.onload = function () {

   const addToCart = document.getElementsByName('addToCart');
   const viewCart = document.getElementById('viewCart');
   const cid = document.getElementById('cid');

   let productId = '';
   let url = '';
   
   // Recorre todos los botones de agregar al carrito y les agrega un evento
   addToCart.forEach((element, i) => {
      element.addEventListener('click', (e) => {
         e.preventDefault();
         productId = document.getElementsByName('addToCart')[i].id;
         addProductToCart(cid.value);
      }, false);
   });
   
   // Agrega un evento al botón de ver carrito
   viewCart.addEventListener('click', (e) => {
      e.preventDefault();
      const url = `/carts/${cid.value}`;
      window.location.href = url;
   });

   // Agrega el producto al carrito con el cartId y productId   
   async function addProductToCart(cartId) {
      url = `/api/carts/${cid.value}/product/${productId.toString()}`;
      await fetch(url, {
         method: 'POST',
      }
      ).then(res => res.json())
         .then(data => {
            if (data.status === 'success') {
               Toastify({
                  text: 'Producto agregado al carrito',
                  className: 'success',
                  style: {
                     background: 'green',
                  }
               }).showToast()
            } else {
               Toastify({
                  text: 'Error al agregar el producto al carrito',
                  className: 'error',
                  style: {
                     background: 'red',
                  }
               }).showToast()
            }
         })
   }
}
