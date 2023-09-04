import { calculation } from "./utils";

async function lambdaHandler(event) {
  const { a, b } = event;

  return calculation(a, b);
}

exports.lambdaHandler = lambdaHandler;
