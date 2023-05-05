import mongoose from "mongoose";

const collection = 'products';

const schema = new mongoose.Schema({
   pid: {
      type: Number,
      required: true,
      unique: true
   },

   title: {
      type: String,
      required: true
   },
   description: {
      type: String,
      require: true
   },
   code: {
      type: String,
      required: true,
      unique: true
   },
   price: {
      type: Number,
      required: true
   },
   stock: {
      type: Number,
      required: true
   },
   category: {
      type: String,
      required: true
   },
   thumbnail: [{
      type: String,
      required: false
   }],
   status: {
      type: Boolean,
      required: false
   },
   createdAt: {
      type: Date,
      default: Date.now()
   },
   updatedAt: {
      type: Date,
   }
});

const ProductModel = mongoose.model(collection, schema);

export default ProductModel;
