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

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const SECRET_WORD = process.env.SECRET_WORD;

export const config = {
   PORT: PORT,
   MONGO_URL: MONGO_URL,
   SECRET_WORD: SECRET_WORD
}