import AWS from "aws-sdk";
import handler from "../src/index";

const mockgetSecretValue = jest.fn((SecretId) => {
  switch (SecretId) {
    case "secret1":
      return {
        SecretString: "secret-1-value",
      };
    case "secret2":
      return {
        SecretString: "secret-2-value",
      };
    default:
      throw Error("secret not found");
  }
});

jest.mock("aws-sdk", () => {
  return {
    config: {
      update() {
        return {};
      },
    },
    SecretsManager: jest.fn(() => {
      return {
        getSecretValue: jest.fn(({ SecretId }) => {
          return {
            promise: () => mockgetSecretValue(SecretId),
          };
        }),
      };
    }),
  };
});

describe("When the handler is invoked with an event", () => {
  test("the correct response is returned", async () => {
    const spy = jest.spyOn(AWS, "SecretsManager");
    const res = await handler();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(mockgetSecretValue).toHaveBeenCalledTimes(2);
    expect(res).toEqual("secret-1-value and secret-2-value");
  });
});
