import {
  describe,
  expect,
  test,
  beforeAll,
  afterAll,
  jest,
} from "@jest/globals";
import { deviceTypeCapture } from "../index";

describe("deviceTypeCapture", () => {
  const mockNavigatorLowEnd = {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    hardwareConcurrency: 2,
    deviceMemory: 2,
    connection: {
      downlink: 10,
      effectiveType: "3g",
      rtt: 1000,
      saveData: true,
    },
  };
  const mockNavigatorMediumEnd = {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    hardwareConcurrency: 4,
    deviceMemory: 4,
    connection: {
      downlink: 0,
      effectiveType: "3g",
      rtt: 600,
      saveData: false,
    },
  };
  const mockNavigatorHighEnd = {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    hardwareConcurrency: 4,
    deviceMemory: 6,
    connection: {
      downlink: 10,
      effectiveType: "4g",
      rtt: 50,
      saveData: false,
    },
  };
  let windowSpy;
  beforeAll(() => {
    windowSpy = jest.spyOn(window, "window", "get");
  });

  afterAll(() => {
    // delete window.navigator;
    windowSpy.mockRestore();
  });

  test("returns an object with the expected properties", () => {
    const result = deviceTypeCapture();
    expect(result).toHaveProperty("tier");
    expect(result).toHaveProperty("tierLevel");
    expect(result).toHaveProperty("clientInfo");
    expect(result).toHaveProperty("timestamp");
    expect(result).toHaveProperty("tierDetails");
    expect(result.tierDetails).toHaveProperty("cpu");
    expect(result.tierDetails).toHaveProperty("ram");
    expect(result.tierDetails).toHaveProperty("connection");
    expect(result.tierDetails).toHaveProperty("connectionRTT");
    expect(result.tierDetails).toHaveProperty("connectionDownlink");
    expect(result.tierDetails).toHaveProperty("saveDataMode");
  });

  test("returns the expected values for a high-end device", () => {
    Object.defineProperty(global, "navigator", {
      get: jest.fn(() => mockNavigatorHighEnd),
    });
    const result = deviceTypeCapture();
    console.log(result);
    expect(result.tier).toEqual("high-end");
    expect(result.tierLevel).toEqual("H");
    expect(result.tierDetails.cpu).toEqual(4);
    expect(result.tierDetails.ram).toEqual(6);
    expect(result.tierDetails.connection).toEqual("4g");
    expect(result.tierDetails.connectionRTT).toEqual(50);
    expect(result.tierDetails.connectionDownlink).toEqual(10);
    expect(result.tierDetails.saveDataMode).toEqual(false);
  });

  test("returns the expected values for a low-end device", () => {
    Object.defineProperty(global, "navigator", {
      get: jest.fn(() => mockNavigatorLowEnd),
    });
    const result = deviceTypeCapture();
    expect(result.tier).toEqual("low-end");
    expect(result.tierLevel).toEqual("L");
    expect(result.tierDetails.cpu).toEqual(2);
    expect(result.tierDetails.ram).toEqual(2);
    expect(result.tierDetails.connection).toEqual("3g");
    expect(result.tierDetails.connectionRTT).toEqual(1000);
    expect(result.tierDetails.connectionDownlink).toEqual(10);
    expect(result.tierDetails.saveDataMode).toEqual(true);
  });

  test("returns the expected values for a mid-range device", () => {
    Object.defineProperty(global, "navigator", {
      get: jest.fn(() => mockNavigatorMediumEnd),
    });
    const result = deviceTypeCapture();
    expect(result.tier).toEqual("mid-range");
    expect(result.tierLevel).toEqual("M");
    expect(result.tierDetails.cpu).toEqual(4);
    expect(result.tierDetails.ram).toEqual(4);
    expect(result.tierDetails.connection).toEqual("3g");
    expect(result.tierDetails.connectionRTT).toEqual(600);
    expect(result.tierDetails.connectionDownlink).toEqual(0);
    expect(result.tierDetails.saveDataMode).toEqual(false);
  });
});
