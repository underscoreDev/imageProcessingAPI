import { Routes } from "./interfaces";
import express, { Express } from "express";
import homeRouter from "./routes/homeRoute";
import imagesRouter from "./routes/imagesRouter";

export const app: Express = express();

const port = 9889;

const routes: Routes[] = [
  { route: "/", router: homeRouter },
  { route: "/api/images", router: imagesRouter },
];

routes.forEach((value: Routes) => app.use(value.route, value.router));

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
