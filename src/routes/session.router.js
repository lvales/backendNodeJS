import { Router } from 'express';
import userModel from '../dao/mongoDb/models/user.model.js';

const router = Router();

router.post('/register', async (req, res) => {

   const { first_name, last_name, email, age, password, admin } = req.body;

   const exist = await userModel.findOne({ email });

   if (exist) return res.status(400).send({ status: "ERROR", error: "Usuario exixtente" });

   const user = {
      first_name,
      last_name,
      email,
      age,
      password,
      rol: admin || 'usuario'
   }

   const result = await userModel.create(user);
   res.send({ status: "succes", msg: "Usuario registrado" })
});

router.post('/login', async (req, res) => {
   const { email, password } = req.body;

   console.log(email, password);

   const user = await userModel.findOne({ email, password });

   if (!user) return res.status(400).send({ status: "ERROR", error: "Datos incorrectos" });

   req.session.user = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age,
      rol: user.rol
   }

   res.send({ status: "success", payload: req.res.user, message: "Usuario logueado" })
});

router.get('/logout', (req, res) => {
   req.session.destroy(error => {
      if(error) return res.status(500).send({status: "ERROR", msg:"Error al intentar cerrar la sesión"});
      res.redirect('/');
   });
});


export default router;
