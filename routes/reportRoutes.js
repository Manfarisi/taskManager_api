const express = require('express')
const { protect, adminOnly } = require('../middlewares/authMiddleware')
const { exportTaskReport, exportUserkReport } = require('../controller/reportController')

const router = express.Router()

router.get('/export/tasks', protect, adminOnly, exportTaskReport)
router.get('/export/users', protect, adminOnly, exportUserkReport)

module.exports = router;
