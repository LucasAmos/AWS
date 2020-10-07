const { bootstrap } = require("./bootstrap/bootstrap");

exports.handler = async function handler(event) {
  await bootstrap();

  try {
    return process.env.STORED_SECRET;
  } catch (error) {
    throw error;
  }
};
