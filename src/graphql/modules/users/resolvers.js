module.exports = {
  Query: {
    async user(_, { login }, { dataSources }) {
      const userRegistered =
        await dataSources.userRegisterService.getUserByLogin(login);

      if (userRegistered) return await userRegistered;

      const { login: login_user, avatar_url } =
        await dataSources.gitHubService.getUser(login);

      return await dataSources.userRegisterService.addUser({
        login: login_user,
        avatar_url: avatar_url,
      });
    },
  },
  User: {
    async tasks(user, _, { dataSources }) {
      return await dataSources.tasksRegisterService.getTasks(user.id);
    },
  },
};
