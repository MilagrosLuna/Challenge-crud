import express from "express";
import cors from "cors";
import areaRoutes from "./routes/area.routes";
import empleadoRoutes from "./routes/empleado.routes";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Gestión de Empleados",
      version: "1.0.0",
      description: "Documentación de la API REST para empleados y áreas",
    },
    servers: [{ url: "http://localhost:4000", description: "Servidor local" }],
  },
  apis: ["./src/routes/area.routes.ts", "./src/routes/empleado.routes.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "API funcionando correctamente" });
});

app.use("/api", express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/areas", areaRoutes);
app.use("/api/empleados", empleadoRoutes);

export default app;
