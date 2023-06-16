import { Router } from "express";
import { adduser, retrieveuser, retrieveusers } from "../controllers/user.controllers.js";

export const userRouter = Router();

userRouter.post("/new", adduser);
userRouter.get("/", retrieveusers);
userRouter.get("/:user_id", retrieveuser);
userRouter.put("/:user_id", verifyToken, updateUser);
userRouter.delete("/:user_id", verifyToken, deleteUser);
userRouter.get("/:user_id", retrieveUserWithCommentsAndPosts);
