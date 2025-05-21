"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const List_1 = require("../models/List");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield List_1.ListModel.find();
        res.json(tasks);
    }
    catch (err) {
        res.status(500).json({ error: 'Error al obtener tareas' });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task } = req.body;
        const newTask = new List_1.ListModel({ task });
        yield newTask.save();
        res.status(201).json(newTask);
    }
    catch (err) {
        res.status(500).json({ error: 'Error al crear tarea' });
    }
}));
const updateTaskHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { task, active } = req.body;
        const updated = yield List_1.ListModel.findByIdAndUpdate(id, { task, active }, { new: true });
        if (!updated) {
            res.status(404).json({ message: "Elemento no encontrado" });
            return;
        }
        res.status(200).json(updated);
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar", error });
    }
});
router.put("/:id", updateTaskHandler);

const deleteTaskHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedTask = yield List_1.ListModel.deleteOne({ _id: id });
        if (deletedTask.deletedCount === 0) {
            res.status(404).json({ message: 'Elemento no encontrado' });
            return;
        }
        res.status(200).json({ message: 'Elemento eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el elemento' });
    }
});
router.delete("/:id", deleteTaskHandler);
exports.default = router;
