import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Defino el storage y el nombre del archivo para multer
const storage = multer.diskStorage({
  destination: function(req, res, cb){
    cb(null,__dirname + '/public/images')
  },
  filename: function(req, file, cb){
    // cb(null, Date.now() + '-' + file.originalname)
    cb(null, `${uuidv4()}.${file.originalname.split('.').pop()}`)
  }
});

// Multer
export const uploader = multer({storage});

// Bcrypt
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const validatePassword = (password,user) => bcrypt.compareSync(password, user.password);


export default __dirname;
