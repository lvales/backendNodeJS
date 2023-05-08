import express from "express";
import mongoose from 'mongoose';
import { Server } from "socket.io";
import handelbars from "express-handlebars";
import __dirname from "./utils.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js"
import viewRouter from "./routes/view.routes.js"
import ProductDao from "./dao/ProductDao.js";
import MessageDao from "./dao/MessageDao.js";

//  Array de mensajes del chat
const messageChat = [];

// Dao
const productDao = new ProductDao();
const messageDao = new MessageDao();

// Express
const PORT = 8080;
const app = express();
const server = app.listen(PORT, () =>
  console.log(`Servidor funcionando en el puerto: ${PORT}`)
);

// MongoDB
const MONGO = 'mongodb+srv://lvales:lvales@ecommerce.5m5kksr.mongodb.net/?retryWrites=true&w=majority';
const conection = mongoose.connect(MONGO);

// Socket.io
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Vistas
app.engine('handlebars', handelbars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');

// Rutas
app.use("/api/products", productsRouter);
app.use("/api/cart", cartsRouter);
app.use('/', viewRouter);

// Websocket
io.on('connection', async socket => {
  console.log('Cliente conectado: ' + socket.id);

  // Obtiene productos y emite al cliente
  const products = await productDao.getProducts();
  socket.emit('client_getAllProduct', products);

  // Agrega producto y emite a todos los clientes
  socket.on('server_addProduct', async data => {
    await productDao.addProduct(data);
    const products = await productDao.getProducts();
    io.emit('client_getAllProduct', products);
    socket.emit('alert', { type: 'success', msg: 'Producto agregado correctamente', color: 'YellowGreen' });
    socket.broadcast.emit('alert', { type: 'success', msg: 'Los productos disponibles han sido actualizados', color: 'DodgerBlue' });
  });

  // Elimina producto y emite a todos los clientes
  socket.on('server_delProduct', async data => {
    const result = await productDao.deleteProduct(data);
    // Si el producto no existe
    if (result.deletedCount === 0) {
      socket.emit('alert', { type: 'error', msg: 'Producto no encontrado', color: 'Crimson' });
    } else {
      const products = await productDao.getProducts();
      io.emit('client_getAllProduct', products);
      socket.emit('alert', { type: 'success', msg: 'Producto eliminado correctamente', color: 'DarkOrange' });
      socket.broadcast.emit('alert', { type: 'success', msg: 'Los productos disponibles han sido actualizados', color: 'DodgerBlue' });
    }
  });

  // Chat 
  socket.on('chat', async data => {
    const result = await messageDao.createMessage(data);
    messageChat.push(data);
    io.emit('chat', messageChat);
  });
});
