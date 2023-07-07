window.onload = function () {

   const purchase = document.getElementById('purchase');
   const cid = document.getElementById('cid');

   purchase.addEventListener('click', (e) => {
      e.preventDefault();
      const url = `/api/carts/${cid.value}/purchase`;
      fetch(url, {
         method: 'GET',
      }
      ).then(res => res.json())
         .then(data => {
            console.log(data.ticket);
            if (data.status === 'success') {
               Toastify({
                  text: 'Compra realizada con éxito',
                  className: 'success',
                  style: {
                     background: 'green',
                  }
               }).showToast()
            } else {
               Toastify({
                  text: 'Error al realizar la compra',
                  className: 'error',
                  style: {
                     background: 'red',
                  }
               }).showToast()
            }
            const url = `/carts/${cid.value}`;
            window.location.href = url;
         })
   });





}