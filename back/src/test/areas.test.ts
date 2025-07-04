import request from "supertest";
import app from "../app";

describe("API Áreas", () => {
  let areaId: number;

  it("GET /api/areas responde con 200", async () => {
    const res = await request(app).get("/api/areas");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /api/areas crea un área", async () => {
    const res = await request(app)
      .post("/api/areas")
      .send({ nombre: "Área Test" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.nombre).toBe("Área Test");
    areaId = res.body.id;
  });

  it("PUT /api/areas/:id actualiza un área", async () => {
    const res = await request(app)
      .put(`/api/areas/${areaId}`)
      .send({ nombre: "Área Actualizada" });
    expect(res.statusCode).toBe(200);
    expect(res.body.nombre).toBe("Área Actualizada");
  });

  it("DELETE /api/areas/:id elimina (soft delete) un área", async () => {
    const res = await request(app).delete(`/api/areas/${areaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.isDeleted).toBe(true);
  });
});
