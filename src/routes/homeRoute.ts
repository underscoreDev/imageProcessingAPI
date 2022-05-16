import express from "express";
import { getHomePage } from "../controllers/homeController";

const homeRouter = express.Router();
homeRouter.route("").get(getHomePage);

export default homeRouter;
