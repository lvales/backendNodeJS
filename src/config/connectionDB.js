import mongoose from "mongoose";
import { config } from "./config.js"

const MONGO_URL = config.MONGO_URL;

class ConnectionDB {
   static #instance;
   constructor() {
      mongoose.connect(MONGO_URL);
   }
   static async getInstance() {
      if (ConnectionDB.#instance) {
         console.log('Ya te encuentras conectado')
         return ConnectionDB.#instance;
      } else {
         try {
            this.#instance = new ConnectionDB();
            console.log('Conectado a la DB')
            return this.#instance
         } catch (error) {
            console.error("Error conectando a la DB:", error.message);
         }
      }
   }
}

export { ConnectionDB }
