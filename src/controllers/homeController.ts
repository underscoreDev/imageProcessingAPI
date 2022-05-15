import { Request, Response } from "express";

export const getHomePage = (req: Request, res: Response) => {
  return res.status(200).json({
    status: "success",
    data: "Hello from the Home route",
  });
};
