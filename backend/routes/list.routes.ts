import { Router, RequestHandler } from "express";

import { ListModel } from "../models/List";

const router = Router();

router.get('/', async (req, res) => {
  try {
    const tasks = await ListModel.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { task } = req.body;
    const newTask = new ListModel({ task });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear tarea' });
  }
});

const updateTaskHandler: RequestHandler<{ id: string }, any, { task?: string; active?: boolean }> = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, active } = req.body;

    const updated = await ListModel.findByIdAndUpdate(id, { task, active }, { new: true });

    if (!updated) {
      res.status(404).json({ message: "Elemento no encontrado" });
      return;
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar", error });
  }
};

router.put("/:id", updateTaskHandler);

const deleteTaskHandler: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await ListModel.deleteOne({ _id: id });

    if (deletedTask.deletedCount === 0) {
      res.status(404).json({ message: 'Elemento no encontrado' });
      return;
    }

    res.status(200).json({ message: 'Elemento eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el elemento' });
  }
};

router.delete("/:id", deleteTaskHandler);

export default router;