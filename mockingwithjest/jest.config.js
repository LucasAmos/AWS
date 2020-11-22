process.env.AWS_REGION = 'eu-west-1';
process.env.DBSecretsManagerVariableName = 'dummy';
process.env.TEST_USER = 'root';
process.env.TEST_PASSWORD = 'root';
process.env.TEST_HOST = 'localhost';
process.env.TEST_PORT = 3306;
process.env.TEST_DATABASE = 'aws_config';

module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
  moduleFileExtensions: ['js', 'd.ts', 'ts', 'tsx', 'json', 'jsx', 'node'],
};
