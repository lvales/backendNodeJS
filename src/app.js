import express from "express";
import { Server } from "socket.io";
import handelbars from "express-handlebars";
import __dirname from "./utils.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js"
import viewRouter from "./routes/view.routes.js"
import ProductManager from "./manager/ProductManager.js";


const manager = new ProductManager("./data/products.json");

// Express
const PORT = 8080;
const app = express();
const server = app.listen(PORT, () =>
  console.log(`Servidor funcionando en el puerto: ${PORT}`)
);
// Socket.io
const socketServerIO = new Server(server);

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

socketServerIO.on('connection', socket => {
  console.log('Cliente conectado: ' + socket.id);

  socket.on('server_addProduct', async data => {
    try {
      await manager.addProduct(data);   
    } catch (error) {
      console.log(error);
    }
    socketServerIO.sockets.emit('client_addProduct', data);
  });

  socket.on('server_delProduct', async data => {
    try {
      await manager.deleteProduct(data.id);   
    } catch (error) {
      console.log(error);
    }
    socketServerIO.sockets.emit('client_delProduct', data.id);
  });
});
