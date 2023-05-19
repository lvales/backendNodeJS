window.onload = function () {
   // Chat 
   const socket = io();
   const body = document.getElementById('body');

   let user;
   const inputChat = document.getElementById('inputChat');

   // Solicitar nombre de usuario
   Swal.fire({
      title: 'Ingresa tu nombre',
      input: 'text',
      inputValidator: (value) => {
         if (!value) {
            return 'Debes ingresar tu nombre!'
         }
      },
      allowOutsideClick: false,
   }).then((result) => {
      if (result.isConfirmed) {
         user = result.value;

      }
   });

   // Emitir evento de usuario conectado
   inputChat.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
         if (inputChat.value != '') {
            socket.emit('chat', { user: user, message: inputChat.value });
            inputChat.value = '';
         }
      }
   });

   // Escuchar evento de usuario conectado
   socket.on('chat', (data) => {
      body.scrollTop = body.scrollHeight;
      const nodo = document.getElementById('nodo');
      let child = '';

      data.forEach(msg => {
         if (msg.user === user) {
            child += `
         <div class="d-flex flex-row justify-content-end mb-4">
            <div class="p-3 me-3 shadow-sm" style="border-radius: 15px; background-color: #d1f5e8;">
               <div class="smallName">${msg.user}:</div>
                <p id="msg_ext" class="small mb-0">${msg.message}</p>
            </div>
            <img src="https://robohash.org/${msg.user}"
               alt="avatar 1" style="width: 45px; height: 100%;">
         </div>`

            nodo.innerHTML = child;
         } else {
            child += `
         <div class="d-flex flex-row justify-content-start mb-4">
            <img src="https://robohash.org/${msg.user}"
               alt="avatar 2" style="width: 45px; height: 100%;">
            <div class="p-3 ms-3 shadow-sm" style="border-radius: 15px; background-color: #eef1f3;">
               <div class="smallName">${msg.user}:</div>
                  <p id="msg_int" class="small mb-0">${msg.message}</p>
               </div>
         </div>`

            nodo.innerHTML = child;
         }
      });
   });
}
