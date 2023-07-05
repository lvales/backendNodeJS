import { Router } from 'express';
import passport from 'passport';

import SessionController from '../controllers/session.controller.js';

const router = Router();
const sessionController = new SessionController

// Registro de Usuario
router.post('/register', passport.authenticate('register', {failureRedirect: '/failregister'}), sessionController.register);

router.get('/failregister', sessionController.failRegister);

// Login
router.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin'}), sessionController.login);

router.get('/faillogin', sessionController.failLogin);

// Logout
router.get('/logout', sessionController.logout);

// Reset Password
router.post('/resetPassword', sessionController.resetPassword);

// current
router.get('/current', sessionController.current);

// Login con GitHub
router.get('/github', passport.authenticate('github', {scope:['user:email']}), sessionController.loginGit)

router.get('/githubcallback', passport.authenticate('github',{failureRedirect:'/'}), sessionController.githubCallBack)

export default router;
