import passport from "passport";
import local from "passport-local";
import GitHubStrategy from 'passport-github2'

import { config } from "./config.js"
import CartDao from "../dao/manager/mongoDb/CartDao.js";
import { createHash, validatePassword } from "../utils.js";
import UserModel from "../dao/models/user.model.js";

const cartDao = new CartDao;

const LocalStrategy = local.Strategy;

const initializePassport = () => {
   // Registro de usuario
   passport.use('register', new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },

      async (req, userName, password, done) => {
         const { first_name, last_name, email, age, rol } = req.body;

         try {
            const user = await UserModel.findOne({ email: userName });

            if (user) {
               console.log('El usuario existe');
               return done(null, false);
            }
            const newUser = {
               first_name,
               last_name,
               email,
               age,
               password: createHash(password),
               rol: rol || "user"
            }

            const result = await UserModel.create(newUser);
            return done(null, result);

         } catch (error) {
            return done('Error al registrar el usuario' + error);
         }
      }
   ));

   // Login usuario
   passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {

      try {
         const user = await UserModel.findOne({ email: username });
        
         if (!user) {
            console.log('No existe el usuario');
            return done(null, false);
         }
         if (!validatePassword(password, user)) return done(null, false);
         
         if(!user.cartId){
            // Se crea un carrito para el usuario y se actualiza el ID del carrito en la información del usuario.  
            // Luego se actualiza la información del usuario en la base de datos. 
            const uid = user._id;
            const cart = await cartDao.createCart();
            user.cartId = cart._id;
            await UserModel.updateOne({ _id: uid }, { $set: user });
         }

         return done(null, user);

      } catch (error) {
         return done('Error al loguear el usuario ' + error);
      }
   }));

   passport.serializeUser((user, done) => {
      done(null, user._id);
   });

   passport.deserializeUser(async (id, done) => {
      const user = await UserModel.findById(id);
      done(null, user);
   });

   // Register GitHub
   passport.use('github', new GitHubStrategy({
      clientID: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
      callbackURL: config.CALLBACK_URL
   }, async (accessTokn, refreshToken, profile, done) => {
      try {
         // console.log(profile); //Para ver la info que viene de github
         const user = await UserModel.findOne({ email: profile._json.email });

         if (!user) {
            // const email = profile._json.email == null ? profile._json.username : null;
            const newUser = {
               first_name: profile._json.name,
               last_name: '',
               email: profile._json.email,
               age: 18,
               password: '',
            }
            const result = await UserModel.create(newUser);
            done(null, result);
         } else {
            done(null, user);
         }
      } catch (error) {
         return done(null, error);
      }
   }))
}

export default initializePassport;