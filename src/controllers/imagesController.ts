import sharp from "sharp";
import { promises as fs } from "fs";
import { NextFunction, Request, Response } from "express";

export const checkUrl = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.query.filename && !req.query.width && !req.query.height) {
      return res.status(403).json({
        status: "Failed",
        data: "One of the following query parameters is missing (filename, width, height)",
      });
    }
    next();
  } catch (error) {
    throw error;
  }
};

export const checkIfImageExistsInAssetsFolder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filename = req.query.filename;
  const absPath = process.env.PWD?.replace("build", "");

  try {
    const file = await fs.readFile(`${absPath}/assets/full/${filename}.jpg`);
    if (file) {
      next();
    }
  } catch (error) {
    return res.status(403).json({
      status: "Failed",
      data: "No such file exists",
    });
  }
};
export const checkIfImageHasBeenProcessed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filename = req.query.filename;
  const absPath = process.env.PWD?.replace("build", "");

  try {
    const resizedImage = await fs.readFile(`${absPath}/assets/thumb/${filename}.jpg`);
    res.status(200).end(resizedImage);
    next();
  } catch (error) {
    next();
  }
};

export const resizeImage = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const filename = req.query.filename;
    const width = Number(req.query.width);
    const height = Number(req.query.height);
    const absPath = process.env.PWD?.replace("build", "");

    const file = await fs.readFile(`${absPath}/assets/full/${filename}.jpg`);

    await sharp(file)
      .resize(width, height)
      .toFormat("jpeg")
      .toFile(`${absPath}/assets/thumb/${filename}.jpg`);

    next();
  } catch (error) {
    throw error;
  }
};

export const sendImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filename = req.query.filename;
    const absPath = process.env.PWD?.replace("build", "");

    const resizedImage = await fs.readFile(`${absPath}/assets/thumb/${filename}.jpg`);

    res.end(resizedImage);
    next();
  } catch (error) {
    throw error;
  }
};
