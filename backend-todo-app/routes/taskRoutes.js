const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');

router.post('/create', TaskController.createTask);
router.get('/user-tasks', TaskController.getTasksByUser);
router.delete('/delete', TaskController.deleteTask);
router.put('/edit', TaskController.editTask);

module.exports = router;
