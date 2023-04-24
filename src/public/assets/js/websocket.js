const socket = io();

const productForm = document.querySelector('#productForm');
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const code = document.querySelector('#code');
const price = document.querySelector('#price');
const stock = document.querySelector('#stock');
const category = document.querySelector('#category');
const thumbnail = document.querySelector('#thumbnail');
const add = document.querySelector('#add');
const idRemove = document.querySelector('#id');
const del = document.querySelector('#del');
const container = document.querySelector('#container');
const miNodo = document.querySelector('#miNodo');
const child = document.querySelector('#child');

socket.on('client_getAllProduct', products =>{
  let child = '';
  products.forEach(e => {
    child += `
    <div class="card m-2" style="width: 18rem;" id="${e.id}">
      <div class="card-body">
          <h6 class="card-subtitle mb-2 text-danger">ID: ${e.id}</h6>
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

add.addEventListener('click', function () {
  event.preventDefault();
  socket.emit('server_addProduct', {
    title: title.value,
    description: description.value,
    code: code.value,
    price: price.value,
    stock: stock.value,
    category: category.value,
    thumbnail: thumbnail.value,
  });
});

del.addEventListener('click', function () {
  event.preventDefault();
  socket.emit('server_delProduct', {
    id: idRemove.value,
  });
});
