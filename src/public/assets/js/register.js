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
   }).then(result => result.json()).then(json =>
      Toastify({
         text: 'Usuario registrado con exito',
         className: 'success',
         style: {
            background: 'YellowGreen',
         }
      }).showToast()
   )
})
