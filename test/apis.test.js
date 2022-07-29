const app = require("../app");
const request = require("supertest");

describe("app", () => {
  it("exposes the API endpoint", async () => {
    await request(app)
      .get("/")
      .expect(200, { msg: "Application up and running" });
  });
});
