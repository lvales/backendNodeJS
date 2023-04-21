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
const miNodo = document.querySelector('#card');

add.addEventListener('click', function () {
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
  socket.emit('server_delProduct', {
    id: idRemove.value,
  });
});


socket.on('client_addProduct', data => {
  console.log(data);
    miNodo.innerHTML += `
      <div class="card m-2" style="width: 18rem;" id="${data.id}">
        <div class="card-body">
            <h6 class="card-subtitle mb-2 text-danger">ID: ${data.id}</h6>
            <h5 class="card-title">${data.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Codigo: ${data.code}</h6>
            <h6 class="card-subtitle mb-2 text-muted">Precio: $${data.price} </h6>
            <p class="card-text">${data.description}</p>
        </div>
      </div>
    `;
});

socket.on('client_delProduct', data => {
  const remove = document.getElementById(data);
  remove.remove();
});
