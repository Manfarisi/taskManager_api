const Task = require("../models/Task");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ✅ Get all users - admin only
const getUsers = async (req, res) => {
  try {
    // ambil semua user dengan role 'member' tanpa field password
    const users = await User.find({ role: "member" }).select("-password");

    // hitung jumlah task tiap user
    const usersWithTaskCount = await Promise.all(
      users.map(async (user) => {
        const pendingTask = await Task.countDocuments({
          assignedTo: user._id,
          status: "Pending",
        });

        const inProgressTask = await Task.countDocuments({
          assignedTo: user._id,
          status: "In-progress",
        });

        const completedTask = await Task.countDocuments({
          assignedTo: user._id,
          status: "Completed",
        });

        return {
          ...user._doc,
          pendingTask,
          inProgressTask,
          completedTask,
        };
      })
    );

    res.status(200).json(usersWithTaskCount);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get user by ID - admin only
const getUsersById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Delete user - admin only
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getUsers, getUsersById, deleteUser };
