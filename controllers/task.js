import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    user: req.user.id
  });
  res.status(201).json(task, { message: "Task created successfully" });
};

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks, { message: "Tasks retrieved successfully" });
};

export const updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id,
       user: req.user.id 
    },
    req.body,
    { new: true }
  );
  res.json(task, { message: "Task updated successfully" });
};

export const deleteTask = async (req, res) => {
  await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id
  });
  res.json({ message: "Task deleted" });
};
