import passport from "passport";
import local from "passport-local";
import GitHubStrategy from 'passport-github2'
import userModel from "../dao/mongoDb/models/user.model.js";
import { createHash, validatePassword } from "../utils.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
   // Registro de usuario
   passport.use('register', new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },

      async (req, userName, password, done) => {
         const { first_name, last_name, email, age, rol } = req.body;

         try {
            const user = await userModel.findOne({ email: userName });

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

            const result = await userModel.create(newUser);
            return done(null, result);

         } catch (error) {
            return done('Error al registrar el usuario' + error);
         }
      }
   ));

   // Login usuario
   passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {

      try {
         const user = await userModel.findOne({ email: username });

         if (!user) {
            console.log('No existe el usuario');
            return done(null, false);
         }

         if (!validatePassword(password, user)) return done(null, false);
         return done(null, user);

      } catch (error) {
         return done('Error al registrar el usuario' + error);
      }
   }));

   passport.serializeUser((user, done) => {
      done(null, user._id);
   });

   passport.deserializeUser(async (id, done) => {
      const user = await userModel.findById(id);
      done(null, user);
   });

   // Register GitHub
   passport.use('github', new GitHubStrategy({
      clientID: 'Iv1.9765a82495b3aa0d',
      clientSecret: '24845e3b2c61129cc20542b5f37f347ae9978bdd',
      callbackURL: 'http://localhost:8080/api/session/githubcallback',
   }, async (accessTokn, refreshToken, profile, done) => {
      try {
         // console.log(profile); //Para ver la info que viene de github
         const user = await userModel.findOne({ email: profile._json.email });

         if (!user) {
            // const email = profile._json.email == null ? profile._json.username : null;
            const newUser = {
               first_name: profile._json.name,
               last_name: '',
               email: profile._json.email,
               age: 18,
               password: '',
            }
            const result = await userModel.create(newUser);
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