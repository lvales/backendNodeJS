const form = document.getElementById('formLogin');

form.addEventListener('submit', e => {
   e.preventDefault();

   const data = new FormData(form);
   const obj = {};

   data.forEach((value, key) => obj[key] = value);

   fetch('/api/session/login', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
         'Content-Type': 'application/json'
      }
   }).then(result => {
      if (result.status !== 200) {
         Toastify({
            text: 'Datos incorrectos',
            className: 'error',
            style: {
               background: 'red',
            }
         }).showToast()
      } else {
         window.location.replace('/products')
      }
   })
})
