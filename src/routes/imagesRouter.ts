import express from "express";
import { checkUrl, resizeImage, sendImage } from "../controllers/imagesController";

const imagesRouter = express.Router();

imagesRouter.route("/").get(checkUrl, resizeImage, sendImage);

export default imagesRouter;
