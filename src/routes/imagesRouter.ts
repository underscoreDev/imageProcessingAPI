import express from "express";
import {
  checkUrl,
  resizeImage,
  checkWidthAndHeight,
  checkIfImageHasBeenProcessed,
  checkIfFileExistsInFullFolder,
} from "../controllers/imagesController";

const imagesRouter = express.Router();

imagesRouter
  .route("/")
  .get(
    checkUrl,
    checkWidthAndHeight,
    checkIfFileExistsInFullFolder,
    checkIfImageHasBeenProcessed,
    resizeImage
  );

export default imagesRouter;
