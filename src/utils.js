import multer from 'multer';
import bcrypt from 'bcrypt';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { Faker, en, es } from '@faker-js/faker';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Defino el storage y el nombre del archivo para multer
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, __dirname + '/public/images')
  },
  filename: function (req, file, cb) {
    // cb(null, Date.now() + '-' + file.originalname)
    cb(null, `${uuidv4()}.${file.originalname.split('.').pop()}`)
  }
});

// Multer
export const uploader = multer({ storage });

// Bcrypt
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const validatePassword = (password, user) => bcrypt.compareSync(password, user.password);

// Faker
export const customFaker = new Faker({
  locale: [en, es]
})

const { commerce, image, database, string, datatype } = customFaker;

export const generateProduct = (quantity) => {
  let products = [];
  for (let i = 0; i < quantity; i++) {

    const product = {
      _id: database.mongodbObjectId(),
      title: commerce.productName(),
      description: commerce.productDescription(),
      code: string.alphanumeric(10),
      price: parseFloat(commerce.price()),
      stock: parseInt(string.numeric(3)),
      category: commerce.department(),
      thumbnail: [
        image.url(),
      ],
      status: datatype.boolean() ? 'true' : 'false',
      createdAt: new Date(),
      __v: 0,
      updatedAt: new Date(),
    }
    products.push(product);
  }
  return products;
}

export default __dirname;
