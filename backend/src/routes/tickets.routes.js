import { Router } from "express";

import userRouter from "./users.routes.js"
import { passportError, authorization } from "../utils/messagesError.js";
import { generarTicket } from "../controllers/tickets.controller.js";

const ticketRouter = Router()

ticketRouter.post('/', passportError('jwt'), generarTicket)


export default ticketRouter