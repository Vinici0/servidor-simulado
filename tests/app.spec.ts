import request from "supertest";
import Server from "../models/server";
const Se = new Server();
Se.listen();

describe("GET /organizations", () => {
  test("should return 200 OK", async () => {
    const response = await request(Se.app).get("/api/organizations").send();
    expect(response.statusCode).toBe(200);
  });

  test("should return with a body", async () => {
    const response = await request(Se.app).get("/api/organizations").send();
    expect(response.body).not.toBeNull();
  });

  test("shuld have content-type application/json ", async () => {
    request(Se.app)
      .get("/api/organizations")
      .set("Content-Type", "application/json")
      .expect(200);
  });
});

describe("POST /organizations", () => {
  test("shuld have content-type application/json", async () => {
    request(Se.app)
      .post("/api/organizations")
      .set("Content-Type", "application/json")
      .expect(200);
  });
});

describe("PUT /organizations", () => {
  test("shuld have content-type application/json", async () => {
    request(Se.app)
      .put("/api/organizations")
      .set("Content-Type", "application/json")
      .expect(200);
  });
});

describe("GET /getRepositoriesByTribe", () => {

  test("shuld have content-type application/json", async () => {
    request(Se.app)
      .get("/api/tribes")
      .set("Content-Type", "application/json")
      .expect(200);
  });

  test("should return with a body", async () => {
    const response = await request(Se.app).get("/api/organizations").send();
    expect(response.body).not.toBeNull();
  });

  test("should return 200 OK", async () => {
    const response = await request(Se.app).get("/api/organizations").send();
    expect(response.statusCode).toBe(200);
  });

});

