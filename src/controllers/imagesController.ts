import sharp from "sharp";
import { promises as fs } from "fs";
import { NextFunction, Request, Response } from "express";

export const checkUrl = (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.filename && !req.query.width && !req.query.height) {
    return res.status(200).json({
      message: "Failed",
      data: "One of the following query parameters is missing (filename, width, height)",
    });
  }
  next();
};

export const resizeImage = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const filename = req.query.filename;
    console.log(filename);
    const width = Number(req.query.width);
    const height = Number(req.query.height);
    const file = await fs.readFile(`assets/full/${filename}.jpg`);

    await sharp(file).resize(width, height).toFormat("jpeg").toFile(`assets/thumb/${filename}.jpg`);
    next();
  } catch (error) {
    throw error;
  }
};

export const sendImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filename = req.query.filename;

    const resizedImage = await fs.readFile(`assets/thumb/${filename}.jpg`);

    res.end(resizedImage);
    next();
  } catch (error) {
    throw error;
  }
};
