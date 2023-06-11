import { Router } from 'express';
import userModel from '../dao/mongoDb/models/user.model.js';
import { createHash, validatePassword } from '../utils.js';
import passport from 'passport';

const router = Router();

// Registro de Usuario
router.post('/register', passport.authenticate('register', {failureRedirect: '/failregister'}), async (req, res) => {
   res.send({ status: "succes", msg: "Usuario registrado" });
});

router.get('/failregister', async (req,res) => {
   console.log('Fallo en el registro');
   res.send({ status: "ERROR", msg: "Error en el registro" });
});

// Login
router.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin'}), async (req, res) => {
   
   if(!req.user) return res.status(401).send({status: "ERROR", msg:"Credenciales invalidas"});

   req.session.user ={
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
      cartId: req.user.cartId,
      rol: req.user.rol
   }
   
   res.send({ status: "success", payload: req.user, message: "Usuario logueado" })
});

router.get('/faillogin', async (req,res) => {
   console.log('Fallo en el ingreso');
   res.send({ status: "ERROR", msg: "Error en el ingreso" });
});

// Logout
router.get('/logout', (req, res) => {
   req.session.destroy(error => {
      if (error) return res.status(500).send({ status: "ERROR", msg: "Error al intentar cerrar la sesión" });
      res.redirect('/');
   });
});

// Reset Password
router.post('/resetPassword', async (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) return res.status(400).send({status: "ERROR", error: "Datos incorrectos"});
   const user = await userModel.findOne({email});
   if (!user) return res.status(401).send({ status: "ERROR", error: "Datos incorrectos" });

   const newPassword = createHash(password);
   await userModel.updateOne({_id: user.id},{$set:{password: newPassword}});

   res.send({status:"success", msg:"Contraseña actuañizada"})
});

// Login con GitHub
router.get('/github', passport.authenticate('github', {scope:['user:email']}), async (req,res)=>{})

router.get('/githubcallback', passport.authenticate('github',{failureRedirect:'/'}), async (req,res)=>{
    req.session.user = req.user;
    res.redirect('/products')
})

export default router;
