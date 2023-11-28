import { Router } from "express";
import passport from "passport";
import { passportError, authorization } from "../utils/messagesError.js";
import { login, register, logout } from "../controllers/session.controller.js";

const sessionRouter = Router()

sessionRouter.post('/login', passport.authenticate('login'), login)
sessionRouter.post('/register', passport.authenticate('register'), register)
sessionRouter.get('/logout', logout)
sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { })
sessionRouter.get('/githubCallback', passport.authenticate('github'), async (req, res) => {
    req.session.user = req.user
    res.status(200).send({ mensaje: 'Usuario logueado' })
})
sessionRouter.get('/current', passportError('jwt'), authorization('user'), (req, res) => {
    res.send(req.user)
})

sessionRouter.get('/getUserDate',passportError('jwt'), authorization('Admin'), (req, res) => {
    console.log("DEsde Backend getNombreUser:", req.user.user.cart)
    res.status(200).send({nombre: req.user.user.nombre, cart: req.user.user.cart})
  });

  sessionRouter.get('/getIdCartUser',passportError('jwt'), authorization('Admin'), (req, res) => {
    
    res.status(200).send(req.user.user.cart)
  });


export default sessionRouter