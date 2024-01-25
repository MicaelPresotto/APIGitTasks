module.exports = ({ req }) => {
  const userId = req.headers.authorization;

  return {
    userId,
  };
};
