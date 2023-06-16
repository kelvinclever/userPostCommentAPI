import { Router } from "express";
import { addcomment, deletecomment, updatecomment } from "../controllers/comments.controllers.js";

export const commentRouter=Router
// Comment routes
commentRouter.post("/posts/:post_id/comments", verifyToken, addcomment);
commentRouter.put("/posts/:post_id/comments/:comment_id", verifyToken, updatecomment);
commentRouter.delete("/posts/:post_id/comments/:comment_id", verifyToken, deletecomment);