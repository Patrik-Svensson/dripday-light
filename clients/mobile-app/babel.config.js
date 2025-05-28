module.exports = function (api) {
  api.cache(true);

  const envFile = process.env.ENV_FILE || '.env';

  return {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["inline-dotenv", { path: envFile }],
    ],
  };
};
