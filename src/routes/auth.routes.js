import { login} from "../controllers/auth.controller.js"
import { Router } from "express"


export const authRouter = Router()
authRouter.post("/login", login)