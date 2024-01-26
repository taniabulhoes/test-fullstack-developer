const db = require('../db');

class TaskModel {
  static async createTask(userId, title, content) {
    try {
      const task = await db.one('INSERT INTO tasks (user_id, title, content) VALUES ($1, $2, $3) RETURNING *', [userId, title, content]);
      return task;

    } catch (error) {
      throw new Error('Error creating task: ' + error.message);
    }
  }

  static async getTasksByUserId(userId) {
    try {
      const tasks = await db.manyOrNone('SELECT * FROM tasks WHERE user_id = $1', [userId]);
      return tasks;

    } catch (error) {
      throw new Error('Error fetching tasks: ' + error.message);
    }
  }

  static async deleteTask(taskId, userId) {
    try {
      const deletedTask = await db.oneOrNone('DELETE FROM tasks WHERE id = $1 RETURNING *', [taskId, userId]);
      return deletedTask;
    } catch (error) {
      throw new Error('Error deleting task: ' + error.message);
    }
  }

  static async editTask(taskId, newTitle, newContent, userId) {
    try {
      const updatedTask = await db.oneOrNone('UPDATE tasks SET title = $2, content = $3 WHERE id = $1 AND user_id = $4 RETURNING *', [taskId, newTitle, newContent, userId]);
      return updatedTask;
    } catch (error) {
      throw new Error('Error editing task: ' + error.message);
    }
  }

}

module.exports = TaskModel;
