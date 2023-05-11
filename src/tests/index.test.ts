import {
  describe,
  expect,
  test,
  beforeAll,
  afterAll,
  jest,
} from "@jest/globals";
import { YOUR_EXPOSED_METHOD } from "../index";

describe("deviceTypeCapture", () => {
  let windowSpy;
  beforeAll(() => {
    windowSpy = jest.spyOn(window, "window", "get");
  });

  afterAll(() => {
    windowSpy.mockRestore();
  });

  test("returns an object with the expected properties", () => {
    const result = YOUR_EXPOSED_METHOD();
    expect(result).toHaveProperty("YOUR_ATTRIBUTE_TO_BE_VALIDATED");

  });
});
