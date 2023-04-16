import express from "express";
import { Server } from "socket.io";
import handelbars from "express-handlebars";
import __dirname from "./utils.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js"
import viewRouter from "./routes/view.routes.js"


const PORT = 8080;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const server = app.listen(PORT, () =>
  console.log(`Servidor funcionando en el puerto: ${PORT}`)
);

// Vistas
app.engine('handlebars', handelbars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views')

// Rutas
app.use("/api/products", productsRouter);
app.use("/api/cart", cartsRouter);
app.use('/', viewRouter);

// Socket.io
const socketServerIO = new Server(server);
socketServerIO.on('connection', socket => {
  console.log('Usuario conectado');
  socket.on('message', data => {
    socket.emit('log', data);
  });
});
