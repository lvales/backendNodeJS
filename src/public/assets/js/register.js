const form = document.getElementById('formRegister');

form.addEventListener('submit', e => {
   e.preventDefault();

   const data = new FormData(form);
   const obj = {};

   data.forEach((value, key) => obj[key] = value);

   fetch('/api/session/register', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
         'Content-Type': 'application/json'
      }
   }).then(result => result.json()).then(json => {
      console.log(result.status);
      if (result.status === 200) {
         Toastify({
            text: 'Usuario registrado con exito',
            className: 'success',
            style: {
               background: 'YellowGreen',
            }
         }).showToast()
      }
   });
})
