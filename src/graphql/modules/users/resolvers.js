const generator = require("../../../helpers/generator");

module.exports = {
  Query: {
    async user(_, { login }, { dataSources }) {
      const userRegistered =
        await dataSources.userRegisterService.getUserByLogin(login);

      if (userRegistered) {
        userRegistered.token = generator.createToken(userRegistered.id);
        return await userRegistered;
      }

      const { login: login_user, avatar_url } =
        await dataSources.gitHubService.getUser(login);

      const newUser = await dataSources.userRegisterService.addUser({
        login: login_user,
        avatar_url: avatar_url,
      });
      newUser.token = generator.createToken(newUser.id);
      return await newUser;
    },
  },
  User: {
    async tasks(user, _, { dataSources }) {
      return await dataSources.tasksRegisterService.getTasks(user.id);
    },
  },
};
