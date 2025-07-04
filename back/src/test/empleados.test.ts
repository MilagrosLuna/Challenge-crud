import request from "supertest";
import app from "../app";

describe("API Empleados", () => {
  let empleadoId: number;
  let areaId: number;

  // creo area temporal para q no falle el test al correr los 2 juntos (por el soft delete)
  beforeAll(async () => {
    const res = await request(app)
      .post("/api/areas")
      .send({ nombre: "Área Temporal para Empleado" });
    areaId = res.body.id;
  });

  // despues de todos los tests elimina el area temporal
  afterAll(async () => {
    await request(app).delete(`/api/areas/${areaId}`);
  });

  it("GET /api/empleados responde con 200", async () => {
    const res = await request(app).get("/api/empleados");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /api/empleados crea un empleado", async () => {
    const nuevoEmpleado = {
      nombreCompleto: "Test User",
      dni: `${Math.floor(Math.random() * 100000000)}`,
      fechaNacimiento: "1990-01-01",
      esDesarrollador: true,
      descripcion: "Empleado de prueba",
      areaId: areaId,
    };
    const res = await request(app).post("/api/empleados").send(nuevoEmpleado);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    empleadoId = res.body.id;
  });

  it("PUT /api/empleados/:id actualiza un empleado", async () => {
    const res = await request(app)
      .put(`/api/empleados/${empleadoId}`)
      .send({ descripcion: "Empleado actualizado" });
    expect(res.statusCode).toBe(200);
    expect(res.body.descripcion).toBe("Empleado actualizado");
  });

  it("DELETE /api/empleados/:id elimina (soft delete) un empleado", async () => {
    const res = await request(app).delete(`/api/empleados/${empleadoId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.isDeleted).toBe(true);
  });
});
