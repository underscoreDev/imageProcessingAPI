import supertest from "supertest";
import { app } from "../../index";

const request = supertest(app);

describe("Test homepage endpoint", () => {
  it("returns a json body", async () => {
    const { body } = await request.get("/");
    expect(body).toEqual({
      status: "success",
      message: "Welcome to Udacity's Image Processing API",
    });
  });
});
