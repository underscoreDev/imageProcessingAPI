import supertest from "supertest";
import { app } from "../../index";
import { sharpProcessing } from "../../controllers//imagesController";

const request = supertest(app);

describe("Check api/images Endpoint", () => {
  it("Expects endpoint to return a 400 status code", async () => {
    const { statusCode, body } = await request.get("/api/images");
    expect(statusCode).toEqual(400);
    expect(body).toEqual({
      status: "Failed",
      data: "One of the following query parameters is missing (filename, width, height)",
    });
  });

  it("Expects endpoint to return a bad request", async () => {
    const { body } = await request.get("/api/images");
    expect(body).toEqual({
      status: "Failed",
      data: "One of the following query parameters is missing (filename, width, height)",
    });
  });
});

describe("Testing image processing", () => {
  it("Processes succesfully whith the right filename, height and width parameters", async () => {
    const result = await sharpProcessing("fjord", 300, 300);
    expect(result).toEqual({
      format: "jpeg",
      width: 300,
      height: 300,
      channels: 3,
      premultiplied: false,
      size: 15036,
    });
  });
});
