import express from "express";
import { checkUrl, resizeImage } from "../controllers/imagesController";

const imagesRouter = express.Router();

imagesRouter.route("/").get(checkUrl, resizeImage);

export default imagesRouter;
