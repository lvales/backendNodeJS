import UserDao from "../dao/manager/mongoDb/UserDao.js";

const userDao = new UserDao;

class UsersController {

   getAllUsers = async (req, res) => {
      const users = await userDao.getAllUsers();

      if (users.exists === false) {
         return res.status(404).send({
            status: 'ERROR',
            msg: 'No hay usuarios en la base de datos para mostrar'
         });
      }
      res.send({
         users
      });
   }

   getUserById = async (req, res) => {
      const uid = req.params.uid;
      const user = await userDao.getUserById(uid);

      if (user.exists === false) {
         return res.status(404).send({
            status: 'ERROR',
            msg: `El usuario con id ${uid} no existe`
         });
      }
      res.send({
         user
      });
   }

   getUserByIdCart = async (req, res) => {
      const cid = req.params.cid;
      const user = await userDao.getUserByIdCart(cid);

      if (user.exists === false) {
         return res.status(404).send({
            status: 'ERROR',
            msg: `El usuario con carrito ${cid} no existe`
         });
      }
      res.send({
         user
      });
   }

}

export default UsersController;
