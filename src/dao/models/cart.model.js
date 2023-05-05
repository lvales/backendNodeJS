import { create } from "express-handlebars";
import mongoose from "mongoose";

const collection = 'carts';

const schema = new mongoose.Schema({
   cid: {
      type: Number,
      required: true
   },
   products: [
      {
         pid: {
            type: Number,
            required: true
         },
         quantity: {
            type: Number,
            required: true
         }
      }
   ],
   createdAt: {
      type: Date,
      default: Date.now()
   },
   updatedAt: {
      type: Date,
   }
});

const CartModel = mongoose.model(collection, schema);

export default CartModel;