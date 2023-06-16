
import { authRouter } from "./routes/auth.routes.js";
import { userRouter } from "./routes/user.post.comment.router.js";
import express,{json} from "express";
import dotenv from "dotenv"
import { commentRouter } from "./routes/comments.routes.js";
import { postRouter } from "./routes/posts.routesjs/index.js";
dotenv.config()


const app = express();
app.use(json())
app.use(express.urlencoded({extended:true}));
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/comments",commentRouter);
app.use("/posts",postRouter)


const {PORT}= process.env
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

