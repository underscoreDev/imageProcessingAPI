import { Request, Response } from "express";

export const getHomePage = (_req: Request, res: Response) => {
  return res.status(200).json({
    status: "success",
    message: "Welcome to Udacity's Image Processing API",
  });
};
