import express, { Express } from "express";
import homeRouter from "./routes/homeRoute";
import imagesRouter from "./routes/imagesRouter";

export const app: Express = express();

const port = 9889;

app.use(homeRouter);
app.use("/api/images", imagesRouter);

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
