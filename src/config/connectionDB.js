import mongoose from "mongoose";
import { config } from "./config.js"

 const MONGO_URL = config.MONGO_URL;
 class ConnectionDB {
   static #instance;
   static async getInstance() {
      if (!ConnectionDB.#instance) {
         try {
            await mongoose.connect(MONGO_URL);
            ConnectionDB.#instance = mongoose.connection;
            console.log("Conectado a la base de datos");
         } catch (error) {
            console.error("Error conectando a la DB:", error.message);
         }
      }
      return ConnectionDB.#instance;
   }
}
export {ConnectionDB}
