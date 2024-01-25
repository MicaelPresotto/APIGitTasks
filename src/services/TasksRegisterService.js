const db = require("../db");

const TaskNotFoundError = require("../errors/TaskNotFoundError");
const NoPermissionError = require("../errors/NoPermissionError");

class TasksRegisterService {
  async getTasks(userId) {
    return await db("tasks").where({ userId: userId });
  }

  async addTask(userId, input) {
    return await (
      await db("tasks")
        .insert({ userId: userId, ...input })
        .returning("*")
    )[0];
  }

  async getTaskById(userId, id) {
    const task = await db("tasks").where({ id: id }).first();
    if (!task) throw new TaskNotFoundError("Task not found");
    if (task.userId != userId) throw new NoPermissionError("Not authorized");
    console.log(task);

    return task;
  }

  async deleteTask(userId, id) {
    await this.getTaskById(userId, id);
    return await db("tasks").where({ id: id }).delete();
  }

  async updateTask(userId, id, input) {
    await this.getTaskById(userId, id);
    return await (
      await db("tasks").where({ id: id }).update(input).returning("*")
    )[0];
  }
}

module.exports = new TasksRegisterService();
