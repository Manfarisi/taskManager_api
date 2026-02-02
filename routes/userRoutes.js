const express = require("express");
const { adminOnly, protect } = require("../middlewares/authMiddleware");
const {
  getUsers,
  getUsersById,
  deleteUser,
} = require("../controller/userController");

const router = express.Router();

// user management routes
router.get("/", protect, adminOnly, getUsers);
router.get("/:id", protect, adminOnly, getUsersById);
router.delete("/:id", protect, adminOnly, deleteUser);

module.exports = router;
