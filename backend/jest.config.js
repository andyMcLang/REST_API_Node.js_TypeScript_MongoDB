const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  transform: {
    ...tsJestTransformCfg,
  },
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: true,
  clearMocks: true,
};
