import sharp from "sharp";
import fsSync, { promises as fs } from "fs";
import { NextFunction, Request, Response } from "express";
import path from "path";

const imagesFullPath = path.resolve(__dirname, "../../assets/full/");
const imagesThumbPath = path.resolve(__dirname, "../../assets/thumb/");
console.log(imagesFullPath);

export const checkUrl = (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.filename || !req.query.width || !req.query.height) {
    return res.status(400).json({
      status: "Failed",
      data: "One of the following query parameters is missing (filename, width, height)",
    });
  } else {
    next();
  }
};

export const checkWidthAndHeight = (req: Request, res: Response, next: NextFunction) => {
  const { width, height } = req.query;

  if (Number(width) && Number(height)) {
    next();
  } else {
    return res.status(400).json({
      status: "Failed",
      data: "Either width or height is not a valid number",
    });
  }
};

export const checkIfFileExistsInFullFolder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { filename } = req.query;
  const imageExists = path.normalize(`${imagesFullPath}/${filename}.jpg`);
  const fileExists = fsSync.existsSync(imageExists);

  if (fileExists) {
    next();
  } else {
    return res.status(403).json({
      message: "Failed",
      data: "File doesn't exist",
    });
  }
};

export const checkIfImageHasBeenProcessed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { filename, width, height } = req.query;
  const alreadyProcessedImage = path.normalize(
    `${imagesThumbPath}/${filename}_${width}_${height}.jpg`
  );
  const fileExists = fsSync.existsSync(alreadyProcessedImage);

  if (fileExists) {
    const fileToBeSent = await fs.readFile(alreadyProcessedImage);
    return res.status(200).end(fileToBeSent);
  } else {
    next();
  }
};

export const sharpProcessing = async (filename: string | false, width: number, height: number) => {
  const fullPath = path.normalize(`${imagesFullPath}/${filename}.jpg`);
  const savedPath = path.normalize(`${imagesThumbPath}/${filename}_${width}_${height}.jpg`);
  const file = await fs.readFile(fullPath);

  return sharp(file).resize(width, height).toFormat("jpeg").toFile(savedPath);
};

export const resizeImage = async (req: Request, res: Response, next: NextFunction) => {
  const width = Number(req.query.width);
  const height = Number(req.query.height);
  const filename = typeof req.query.filename === "string" && req.query.filename;
  const savedPath = path.normalize(`${imagesThumbPath}/${filename}_${width}_${height}.jpg`);

  try {
    const file = await sharpProcessing(filename, width, height);
    const resizedImage = await fs.readFile(savedPath);
    file && resizedImage && res.end(resizedImage);
  } catch (error) {
    res.status(403).json({
      message: "Failed",
      data: "Sorry image couldn't be processed",
    });
  }
};
