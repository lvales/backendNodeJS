import mongoose from "mongoose";

const collection = 'messages';

const schema = new mongoose.Schema({
   user:{
      type: String,
      required: true
   },
   message:{
      type: String,
      require: true
   },
   createdAt: {
      type: Date,
      default: Date.now()
   },
});

const MessageModel = mongoose.model(collection, schema);

export default MessageModel;