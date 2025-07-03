import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   name: Empleados
 *   description: Gestión de empleados
 */

/**
 * @swagger
 * /api/empleados:
 *   get:
 *     summary: Listar empleados activos
 *     tags: [Empleados]
 *     responses:
 *       200:
 *         description: Array de empleados con área asociada
 *       500:
 *         description: Error del servidor
 */
router.get("/", async (_req, res) => {
  try {
    const empleados = await prisma.empleado.findMany({
      where: { isDeleted: false },
      include: { area: true },
    });
    res.json(empleados);
  } catch (e) {
    res.status(500).json({ error: "Error al obtener empleados" });
  }
});

/**
 * @swagger
 * /api/empleados:
 *   post:
 *     summary: Crear un nuevo empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreCompleto:
 *                 type: string
 *               dni:
 *                 type: string
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *               esDesarrollador:
 *                 type: boolean
 *               descripcion:
 *                 type: string
 *               areaId:
 *                 type: integer
 *             required:
 *               - nombreCompleto
 *               - dni
 *               - fechaNacimiento
 *               - esDesarrollador
 *               - descripcion
 *               - areaId
 *     responses:
 *       201:
 *         description: Empleado creado correctamente
 *       500:
 *         description: Error del servidor
 */
router.post("/", async (req, res) => {
  try {
    const {
      nombreCompleto,
      dni,
      fechaNacimiento,
      esDesarrollador,
      descripcion,
      areaId,
    } = req.body;

    if (!nombreCompleto || !dni || !fechaNacimiento || areaId == null) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const area = await prisma.area.findUnique({ where: { id: areaId } });
    if (!area || area.isDeleted) {
      return res.status(400).json({ error: "Área inválida" });
    }

    const nuevoEmpleado = await prisma.empleado.create({
      data: {
        nombreCompleto,
        dni,
        fechaNacimiento: new Date(fechaNacimiento),
        esDesarrollador,
        descripcion,
        areaId,
      },
    });

    res.status(201).json(nuevoEmpleado);
  } catch (e) {
    res.status(500).json({ error: "Error al crear empleado" });
  }
});

/**
 * @swagger
 * /api/empleados/{id}:
 *   put:
 *     summary: Actualizar parcialmente un empleado por ID
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del empleado a actualizar
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreCompleto:
 *                 type: string
 *               dni:
 *                 type: string
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *               esDesarrollador:
 *                 type: boolean
 *               descripcion:
 *                 type: string
 *               areaId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Empleado actualizado correctamente
 *       500:
 *         description: Error del servidor
 */
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const body = req.body;

    const data: any = {};
    for (const key of Object.keys(body)) {
      if (key === "fechaNacimiento") {
        data[key] = new Date(body[key]);
      } else {
        data[key] = body[key];
      }
    }

    const empleadoActualizado = await prisma.empleado.update({
      where: { id },
      data,
    });

    res.json(empleadoActualizado);
  } catch (e) {
    res.status(500).json({ error: "Error al actualizar empleado" });
  }
});

/**
 * @swagger
 * /api/empleados/{id}:
 *   delete:
 *     summary: Baja lógica de un empleado por ID
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del empleado a eliminar
 *     responses:
 *       200:
 *         description: Empleado marcado como eliminado (soft delete)
 *       500:
 *         description: Error del servidor
 */
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const empleadoEliminado = await prisma.empleado.update({
      where: { id },
      data: { isDeleted: true },
    });

    res.json(empleadoEliminado);
  } catch (e) {
    res.status(500).json({ error: "Error al eliminar empleado" });
  }
});

export default router;
