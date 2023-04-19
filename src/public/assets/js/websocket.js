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
const id = document.querySelector('#id');
const del = document.querySelector('#del');
const miNodo = document.querySelector('#card');

add.addEventListener('click', async function() {

  const data = new FormData(productForm);

  await fetch('api/products', {
    method:'POST',
    body: data
  });

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

del.addEventListener('click', async function() {

  const route = 'api/products/' + id.value;
  const data = new FormData(delForm);

  await fetch(route, {
    method:'DELETE',
    body: data
  });

  socket.emit('server_delProduct', {
    id: id.value,
  });
});


socket.on('client_addProduct', data => {
  location.reload();
});

socket.on('client_delProduct', data => {
  location.reload();
});
