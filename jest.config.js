module.exports = {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    // Mock CSS Modules
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.ts",
  },
};
