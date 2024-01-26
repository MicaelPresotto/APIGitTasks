module.exports = {
  Query: {
    async tasks(_, __, { dataSources, validate }) {
      const userId = validate();
      return await dataSources.tasksRegisterService.getTasks(userId);
    },
    async task(_, { id }, { dataSources, validate }) {
      const userId = validate();
      return await dataSources.tasksRegisterService.getTaskById(userId, id);
    },
  },
  Mutation: {
    async createTask(_, { input }, { dataSources, validate }) {
      const userId = validate();
      return await dataSources.tasksRegisterService.addTask(userId, input);
    },
    async deleteTask(_, { id }, { dataSources, validate }) {
      const userId = validate();
      return await dataSources.tasksRegisterService.deleteTask(userId, id);
    },
    async updateTask(_, { id, input }, { dataSources, validate }) {
      const userId = validate();
      return await dataSources.tasksRegisterService.updateTask(
        userId,
        id,
        input
      );
    },
  },
};
