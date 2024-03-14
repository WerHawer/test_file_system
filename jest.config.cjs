module.exports = {
  preset: 'ts-jest/presets/default-esm', // Используйте этот пресет для ES модулей
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Перенаправление импортов JS для совместимости с ESM
  },
  testEnvironment: 'jsdom',
};
