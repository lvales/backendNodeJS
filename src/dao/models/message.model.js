import mongoose from "mongoose";
import { stringify } from "uuid";

const collection = 'messages';

const schema = new mongoose.Schema({
   user:{
      type: String,
      required: true
   },
   message:{
      type: String,
      require: true
   }
});

const MessageModel = mongoose.model(collection, schema);