import express from "express";
import passport from "passport";
import { Server } from "socket.io";
import session from "express-session";
import MongoStore from 'connect-mongo'
import handelbars from "express-handlebars";

import __dirname from "./utils.js";
import { config } from "./config/config.js"
import viewRouter from "./routes/view.routes.js"
import cartsRouter from "./routes/carts.router.js"
import ProductDao from "./dao/mongoDb/ProductDao.js";
import MessageDao from "./dao/mongoDb/MessageDao.js";
import sessionRouter from "./routes/session.router.js"
import { ConnectionDB } from "./config/connectionDB.js";
import productsRouter from "./routes/products.router.js";
import initializePassport from "./config/passport.config.js";

//  Array de mensajes del chat
const messageChat = [];

// Dao
const productDao = new ProductDao();
const messageDao = new MessageDao();

// Express
const PORT = config.PORT;
const app = express();
const server = app.listen(PORT, () =>
  console.log(`Servidor funcionando en el puerto: ${PORT}`)
);

// MongoDB
const MONGO = config.MONGO_URL + config.MONGO_DB;
const connection = ConnectionDB.getInstance();

// Socket.io
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(session({
  store: new MongoStore({
    mongoUrl: MONGO,
    ttl: 3600,
  }),
  secret: config.SECRET_WORD,
  resave: false,
  saveUninitialized: false
}))

// Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Vistas
app.engine('handlebars', handelbars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');

// Rutas
app.use('/', viewRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
app.use('/api/session', sessionRouter);

// Websocket
io.on('connection', async socket => {
  console.log('Cliente conectado: ' + socket.id);

  // Obtiene productos y emite al cliente
  const products = await productDao.getProducts(10, 1, null, 'desc');
  socket.emit('client_getAllProduct', products);

  // Agrega producto y emite a todos los clientes
  socket.on('server_addProduct', async data => {
    await productDao.addProduct(data);
    const products = await productDao.getProducts(10, 1, null, 'desc');
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
      const products = await productDao.getProducts(10, 1, null, 'desc');
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
