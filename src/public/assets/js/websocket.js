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
const miNodo = document.querySelector('#card');

add.addEventListener('click', function () {

  socket.emit('server', {
    title: title.value,
    description: description.value,
    code: code.value,
    price: price.value,
    stock: stock.value,
    category: category.value,
    thumbnail: thumbnail.value,
  });

  const data = new FormData(productForm);

  fetch('api/products', {
    method:'POST',
    body: data
  });


});


socket.on('client', data => {
  miNodo.innerHTML += `
    <div class="card m-2" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${data.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Codigo: ${data.code}</h6>
        <h6 class="card-subtitle mb-2 text-muted">Precio: ${data.price} </h6>
        <p class="card-text">${data.description}</p>
      </div>
    </div>
  `
});




  // socket.on('connect', () => {
  //   console.log('Conectado al servidor');
  // });

  // socket.on('disconnect', () => {
  //   console.log('Desconectado del servidor');
  // });
