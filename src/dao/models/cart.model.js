 import mongoose from "mongoose";

const collection = 'carts';

const schema = new mongoose.Schema({
   products: {
      type: [
         {
            product: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "products",
            },
            quantity:Number,
            createdAt: {
               type: Date,
               default: Date.now()
            }
         }
      ],
      default:[]
   },
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