window.onload = function () {

   const purchase = document.getElementById('purchase');
   const cid = document.getElementById('cid');

   purchase.addEventListener('click', (e) => {
      console.log('object');
      e.preventDefault();
      const url = `/api/carts/${cid.value}/purchase`;
      fetch(url, {
         method: 'GET',
      }
      ).then(res => res.json())
         .then(data => {
            (data.status) === 'success' ? alert('Compra realizada con exito') : alert('Error al agregar producto al carrito');
            const url = `/carts/${cid.value}`;
            window.location.href = url;
         })
   });





}