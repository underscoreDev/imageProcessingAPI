import express from "express";
import {
  checkUrl,
  sendImage,
  resizeImage,
  checkIfImageHasBeenProcessed,
  checkIfFilenameExistsInAssetsFullFolder,
  checkWidthAndHeight,
} from "../controllers/imagesController";

const imagesRouter = express.Router();

imagesRouter
  .route("/")
  .get(
    checkUrl,
    checkWidthAndHeight,
    checkIfFilenameExistsInAssetsFullFolder,
    checkIfImageHasBeenProcessed,
    resizeImage,
    sendImage
  );

export default imagesRouter;
