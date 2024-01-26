const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');
const authController = require('../controllers/authController');


router.post('/create', authController, TaskController.createTask);
router.get('/user-tasks', authController, TaskController.getTasksByUser);
router.delete('/delete', authController, TaskController.deleteTask);
router.put('/edit', authController, TaskController.editTask);

module.exports = router;
