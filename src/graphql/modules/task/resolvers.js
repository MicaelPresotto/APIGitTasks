module.exports = {
  Query: {
    async tasks(_, __, { dataSources, userId }) {
      return await dataSources.tasksRegisterService.getTasks(userId);
    },
    async task(_, { id }, { dataSources, userId }) {
      return await dataSources.tasksRegisterService.getTaskById(userId, id);
    },
  },
  Mutation: {
    async createTask(_, { input }, { dataSources, userId }) {
      return await dataSources.tasksRegisterService.addTask(userId, input);
    },
    async deleteTask(_, { id }, { dataSources, userId }) {
      return await dataSources.tasksRegisterService.deleteTask(userId, id);
    },
    async updateTask(_, { id, input }, { dataSources, userId }) {
      return await dataSources.tasksRegisterService.updateTask(
        userId,
        id,
        input
      );
    },
  },
};
