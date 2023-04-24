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

socketServerIO.on('connection', async socket => {
  console.log('Cliente conectado: ' + socket.id);

  const products = await manager.getProducts();
  socket.emit('client_getAllProduct', products);
  
  socket.on('server_addProduct', async data => {
    await manager.addProduct(data);
    const products = await manager.getProducts();
    socketServerIO.emit('client_getAllProduct', products);
  });
  
  socket.on('server_delProduct', async data => {
    await manager.deleteProduct(data.id);
    const products = await manager.getProducts();
    socketServerIO.emit('client_getAllProduct', products);
  });
});
