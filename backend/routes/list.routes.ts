import { Router, RequestHandler } from "express";

import { ListModel } from "../models/List";

const router = Router();

router.get('/', async (req, res) => {
  try {
    const tasks = await ListModel.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Oops!, something went wrong' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { task } = req.body;
    const newTask = new ListModel({ task });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Oops!, something went wrong' });
  }
});

const updateTaskHandler: RequestHandler<{ id: string }, any, { task?: string; active?: boolean }> = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, active } = req.body;

    const updated = await ListModel.findByIdAndUpdate(id, { task, active }, { new: true });

    if (!updated) {
      res.status(404).json({ message: "Element not found" });
      return;
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Oops!, something went wrong", error });
  }
};

router.put("/:id", updateTaskHandler);

const deleteTaskHandler: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await ListModel.deleteOne({ _id: id });

    if (deletedTask.deletedCount === 0) {
      res.status(404).json({ message: 'Element not found' });
      return;
    }

    res.status(200).json({ message: 'One less thing! List deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Oops!, something went wrong' });
  }
};

router.delete("/:id", deleteTaskHandler);

export default router;