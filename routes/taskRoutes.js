import express from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/task.js";
import { isUserAuthorized } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/createTask', isUserAuthorized, createTask);
router.get('/getTasks', isUserAuthorized, getTasks);
router.put('/updateTask/:id', isUserAuthorized, updateTask);
router.delete('/deleteTask/:id', isUserAuthorized, deleteTask);

export default router;


