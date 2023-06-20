import path from "path";
import dotenv from "dotenv";
import { Command } from "commander";
import __dirname from "../utils.js";

const program = new Command();

program
   .option("-mode <modo>", "modo de inicio", "dev")
program.parse();

const enviroment = program.opts();

const pathEnviroment = enviroment.Mode === "prod" ? path.join(__dirname, "../.env.prod") : path.join(__dirname, "../.env.dev");

dotenv.config({ path: pathEnviroment });

const PORT           = process.env.PORT;
const MONGO_URL      = process.env.MONGO_URL;
const SECRET_WORD    = process.env.SECRET_WORD;
const CLIENT_ID      = process.env.CLIENT_ID;
const CLIENT_SECRET  = process.env.CLIENT_SECRET;
const CALLBACK_URL   = process.env.CALLBACK_URL;
const ADMIN_EMAIL    = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export const config = {
   PORT           : PORT,
   MONGO_URL      : MONGO_URL,
   SECRET_WORD    : SECRET_WORD,
   CLIENT_ID      : CLIENT_ID,
   CLIENT_SECRET  : CLIENT_SECRET,
   CALLBACK_URL   : CALLBACK_URL,
   ADMIN_EMAIL    : ADMIN_EMAIL,
   ADMIN_PASSWORD : ADMIN_PASSWORD
}