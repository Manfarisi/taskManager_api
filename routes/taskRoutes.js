const express = require("express");
const { adminOnly, protect } = require("../middlewares/authMiddleware");
const {
  getDasbordData,
  getUsergetDasbordData,
  getTask,
  getTaskById,
  createTask,
  updateTask,
  updateTaskChecklist,
  deleteTask,
  updateTaskStatus,
} = require("../controller/taskController");

const router = express.Router();

//  task management routes
router.get("/dashboard-data", protect, getDasbordData);
router.get("/user-dashboard-data", protect, getUsergetDasbordData);
router.get("/all", protect, getTask);
router.get("/:id", protect, getTaskById);
router.post("/", protect, adminOnly, createTask);
router.put("/:id", protect, updateTask);
router.put("/:id/status", protect, updateTaskStatus);
router.delete("/:id", protect, adminOnly, deleteTask);
router.put("/:id/todo", protect, updateTaskChecklist);

module.exports = router;
