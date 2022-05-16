import express from "express";
import {
  checkUrl,
  sendImage,
  resizeImage,
  checkIfImageHasBeenProcessed,
  checkIfImageExistsInAssetsFolder,
} from "../controllers/imagesController";

const imagesRouter = express.Router();

imagesRouter
  .route("/")
  .get(
    checkUrl,
    checkIfImageExistsInAssetsFolder,
    checkIfImageHasBeenProcessed,
    resizeImage,
    sendImage
  );

export default imagesRouter;
