const fs = require("fs");
const nodePath = require("path");
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("../tsconfig.json");

const paths = compilerOptions.paths ? compilerOptions.paths : {};
const path = "./local.env.js";
// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: nodePath.resolve(__dirname, ".."),
});

// Any custom config you want to pass to Jest
const customJestConfig = {
  rootDir: "../",
  setupFilesAfterEnv: ["<rootDir>/__test__/jest.setup.js"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  setupFiles: ["<rootDir>/local.env.js"],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(paths, { prefix: "<rootDir>/" }),
    "\\.(scss|sass|css)$": "identity-obj-proxy",
    jose: "<rootDir>/node_modules/jose/dist/node/cjs/index.js",
  },
  testEnvironmentOptions: {
    url: "https://staging-logistic-app.agriaku.com/",
  },
};

try {
  if (fs.existsSync(path) === false) {
    delete customJestConfig.setupFiles;
  }
} catch (err) {
  console.error(err);
}

module.exports = createJestConfig(customJestConfig);
