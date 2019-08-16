module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.(js|jsx|mjs)$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest"
  },
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageReporters: ["text-summary", "html"],
  watchPathIgnorePatterns: ["<rootDir>/node_modules/"]
};
