import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   name: Áreas
 *   description: Gestión de áreas
 */

/**
 * @swagger
 * /api/areas:
 *   get:
 *     summary: Listar todas las áreas
 *     tags: [Áreas]
 *     responses:
 *       200:
 *         description: Lista de áreas
 */
router.get("/", async (_, res) => {
  const areas = await prisma.area.findMany();
  res.json(areas);
});

/**
 * @swagger
 * /api/areas:
 *   post:
 *     summary: Crear una nueva área
 *     tags: [Áreas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *             required:
 *               - nombre
 *     responses:
 *       201:
 *         description: Área creada correctamente
 *       400:
 *         description: Nombre inválido
 *       500:
 *         description: Error del servidor
 */
router.post("/", async (req, res) => {
  try {
    const { nombre } = req.body;
    const nueva = await prisma.area.create({ data: { nombre } });
    res.status(201).json(nueva);
  } catch {
    res.status(500).json({ error: "error al crear área" });
  }
});

/**
 * @swagger
 * /api/areas/{id}:
 *   put:
 *     summary: Actualizar el nombre de un área por ID
 *     tags: [Áreas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del área a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *             required:
 *               - nombre
 *     responses:
 *       200:
 *         description: Área actualizada correctamente
 *       400:
 *         description: Nombre inválido o ID inválido
 *       500:
 *         description: Error del servidor
 */
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre } = req.body;
    const upd = await prisma.area.update({ where: { id }, data: { nombre } });
    res.json(upd);
  } catch {
    res.status(500).json({ error: "error al actualizar área" });
  }
});

/**
 * @swagger
 * /api/areas/{id}:
 *   delete:
 *     summary: Baja lógica de un área por ID
 *     tags: [Áreas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del área a eliminar
 *     responses:
 *       200:
 *         description: Área eliminada (soft delete)
 *       500:
 *         description: Error del servidor
 */
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const del = await prisma.area.update({
      where: { id },
      data: { isDeleted: true },
    });
    res.json(del);
  } catch {
    res.status(500).json({ error: "error al eliminar área" });
  }
});

export default router;
