const socket = io();

const productForm = document.querySelector('#productForm');
const delForm = document.querySelector('#delForm');
const add = document.querySelector('#add');
const del = document.querySelector('#del');
const idRemove = document.querySelector('#pid');
const container = document.querySelector('#container');
const miNodo = document.querySelector('#miNodo');

// Notificaciones
socket.on('alert', (data) => {
  Toastify({
    text: data.msg,
    className: data.type,
    style: {
      background: data.color,
    }
  }).showToast();
});

// Obtener productos
socket.on('client_getAllProduct', products => {
  let child = '';
  products.products.forEach(e => {
    child += `
    <div class="card m-2" style="width: 18rem;" id="${e._id}">
      <img class="card-img-top" src="${e.thumbnail}" alt="Card image cap">
      <div class="card-body">
          <h6 class="card-subtitle mb-2 text-danger mt-2">ID: ${e._id}</h6>
          <h5 class="card-title">${e.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Codigo: ${e.code}</h6>
          <h6 class="card-subtitle mb-2 text-muted">Precio: $${e.price} </h6>
          <p class="card-text">${e.description}</p>
      </div>
    </div>
  `;
    miNodo.innerHTML = child;
  });
});

// Agregar producto
add.addEventListener('click', function () {
  event.preventDefault();
  socket.emit('server_addProduct', {
    title: productForm.title.value,
    description: productForm.description.value,
    code: productForm.code.value,
    price: productForm.price.value,
    stock: productForm.stock.value,
    category: productForm.category.value,
    thumbnail: productForm.thumbnail.value,
  });
  productForm.reset();
});

// Eliminar producto
del.addEventListener('click', function () {
  event.preventDefault();
  socket.emit('server_delProduct', idRemove.value);
  delForm.reset();
});
