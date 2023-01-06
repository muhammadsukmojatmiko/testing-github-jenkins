module.exports = function (api) {
  api.cache(true);

  const presets = ["next/babel"];

  const plugins = [
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
  ];

  return {
    presets,
    plugins,
  };
};
