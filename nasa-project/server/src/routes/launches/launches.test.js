const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("should respond with 200 success", async () => {
    const response = await request(app).get("/launches");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("application/json");
  });
});

describe("Test POST /launches", () => {
  const launchData = {
    mission: "ZTM155",
    rocket: "ZTM Experimental IS1",
    target: "Kepler-186 f",
    launchDate: "January 17, 2030",
  };

  test("should response with 201 created", async () => {
    const response = await request(app).post("/launches").send(launchData);

    expect(response.status).toBe(201);
    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.body).toMatchObject({
      ...launchData,
      launchDate: new Date(launchData.launchDate).toISOString(),
    });
  });

  test("should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send({
        ...launchData,
        rocket: undefined,
      });

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      error: "Missing require launch property",
    });
  });

  test("should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send({
        ...launchData,
        launchDate: "invalid date",
      });

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });
});
