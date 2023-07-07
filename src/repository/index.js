import ProductDao from "../dao/manager/mongoDb/ProductDao.js";
import ProductRepository from "../repository/products.repository.js";
import CartDao from "../dao/manager/mongoDb/CartDao.js";
import CartRepository from "../repository/cart.repository.js";
import TicketDao from "../dao/manager/mongoDb/TicketDao.js";
import TicketRepository from "../repository/ticket.repository.js";

export const productServices = new ProductRepository(new ProductDao);
export const cartServices = new CartRepository(new CartDao); 
export const ticketServices = new TicketRepository(new TicketDao);

