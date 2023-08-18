import express from "express";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { PostBusiness } from "../business/PostBusiness";
import { PostController } from "../controller/PostController";
import { PostsDatabase } from "../database/PostsDatabase";
import { prototype } from "events";

export const postRouter = express.Router();

const postController = new PostController(
    new PostBusiness(new PostsDatabase(), new IdGenerator(), new TokenManager())
);

postRouter.post("/", postController.createPost);
postRouter.get("/", postController.getPosts);
postRouter.put("/:id", postController.editPost);
postRouter.delete("/:id", postController.deletePost);

postRouter.put("/")

postRouter.put("/:id/like", postController.likeOrDislikePost);