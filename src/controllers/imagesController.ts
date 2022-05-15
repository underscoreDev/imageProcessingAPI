import { NextFunction, Request, Response } from "express";
// import sharp from "sharp";

export const checkUrl = (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.filename && !req.query.width && !req.query.height) {
    return res.status(200).json({
      message: "Failed",
      data: "One of the following query parameters is missing (filename, width, height)",
    });
  }
  next();
};
// ?filename=argentina&width=300&height=300

export const resizeImage = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.query);
  res.send("It works");
};
