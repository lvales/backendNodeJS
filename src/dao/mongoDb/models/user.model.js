import mongoose from "mongoose";

const collection = 'User';

const schema = new mongoose.Schema({
   first_name: String,
   last_name: String,
   email: String,
   age:Number,
   password: String,
   rol: String,
   cartId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "carts"
   },
   createdAt: {
      type: Date,
      default: Date.now()
   }
});
const userModel = mongoose.model(collection, schema);

export default userModel;