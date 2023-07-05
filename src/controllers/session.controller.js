import userModel from '../dao/models/user.model.js';
import { createHash } from '../utils.js';
import { CreateUserDto } from '../dao/dto/user.dto.js'

class SessionController {
   // Registro de Usuario
   register = async (req, res) => {
      res.send({ status: "success", msg: "Usuario registrado" });
   }

   failRegister = async (req, res) => {
      console.log('Fallo en el registro');
      res.send({ status: "ERROR", msg: "Error en el registro" });
   }
   // Login
   login = async (req, res) => {

      
      if (!req.user) return res.status(401).send({ status: "ERROR", msg: "Credenciales invalidas" });
      
      req.session.user = {
         uid: req.user._id,
         first_name: req.user.first_name,
         last_name: req.user.last_name,
         email: req.user.email,
         age: req.user.age,
         cartId: req.user.cartId,
         rol: req.user.rol
      }
      // console.log(req.session.user);
      
      res.send({ status: "success", payload: req.user, message: "Usuario logueado" })
   }

   failLogin = async (req, res) => {
      console.log('Fallo en el ingreso');
      res.send({ status: "ERROR", msg: "Error en el ingreso" });
   }
   // Logout
   logout = (req, res) => {
      req.session.destroy(error => {
         if (error) return res.status(500).send({ status: "ERROR", msg: "Error al intentar cerrar la sesión" });
         res.redirect('/');
      });
   }

   // current
   current = async (req, res) => {
      if (!req.session.user) return res.status(401).send({ status: "ERROR", msg: "No hay usuario logueado" });
      const createUserDto = new CreateUserDto(req.session.user);
      res.send({ status: "success", payload: createUserDto, message: "Usuario logueado" })
   }
   
   // Reset Password
   resetPassword = async (req, res) => {
      const { email, password } = req.body;

      if (!email || !password) return res.status(400).send({ status: "ERROR", error: "Datos incorrectos" });
      const user = await userModel.findOne({ email });
      if (!user) return res.status(401).send({ status: "ERROR", error: "Datos incorrectos" });

      const newPassword = createHash(password);
      await userModel.updateOne({ _id: user.id }, { $set: { password: newPassword } });

      res.send({ status: "success", msg: "Contraseña actuañizada" })
   }
   // Login con GitHub
   loginGit = async (req, res) => { }

   githubCallBack = async (req, res) => {
      req.session.user = req.user;
      res.redirect('/products')
   }

}

export default SessionController;