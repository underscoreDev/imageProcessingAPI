import supertest from "supertest";
import { app } from "../index";

const request = supertest(app);

describe("Test root server", () => {
  it("returns status code 200", async () => {
    const { statusCode } = await request.get("/");
    expect(statusCode).toBe(200);
  });
});
