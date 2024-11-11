module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Use babel-jest for .js/.jsx files
    },
    testEnvironment: 'jsdom', // Ensure jsdom is used for React testing
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  };