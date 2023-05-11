interface NavigatorWithConnection extends Navigator {
  connection: {
    downlink: number | null;
    effectiveType: string | null;
    rtt: number | null;
    saveData: boolean | null;
    type?: any;
  };
}

function getCurrentTimestamp(): number {
  return Date.now();
}

function getClientInfo(): object {
  if (typeof window !== "undefined") {
    // Retrieve information about the client environment
    const { userAgent, language, platform } = navigator;
    const { width: screenWidth, height: screenHeight } = screen;
    const browserName = getBrowserName();
    const browserVersion = getBrowserVersion();
    return {
      userAgent,
      language,
      platform,
      screenWidth,
      screenHeight,
      browserName,
      browserVersion,
    };
  } else {
    return {
      node: true,
      nodeVersion: process.version,
    };
  }
}

function getBrowserName(): string | object {
  if (typeof window !== "undefined") {
    // Retrieve the name of the current browser
    const userAgent = navigator.userAgent;
    switch (true) {
      case userAgent.includes("Chrome"):
        return "Chrome";
      case userAgent.includes("Firefox"):
        return "Firefox";
      case userAgent.includes("Safari"):
        return "Safari";
      case userAgent.includes("Edge"):
        return "Edge";
      case /MSIE|Trident/.test(userAgent):
        return "IE";
      default:
        return "Unknown";
    }
  } else {
    return {
      node: true,
      nodeVersion: process.version,
    };
  }
}

function getBrowserVersion(): string | object {
  // Retrieve the version of the current browser
  if (typeof window !== "undefined") {
    const userAgent = navigator.userAgent;
    const regex = /(Chrome|Firefox|Safari|Edge|MSIE|Trident)\/([\d.]+)/;
    const match = userAgent.match(regex);
    return match != null ? match[2] : "Unknown";
  } else {
    return {
      node: true,
      nodeVersion: process.version,
    };
  }
}

function getNetworkInformation(): {
  downlink: number | null;
  effectiveType: string | null;
  rtt: number | null;
  saveData: boolean | null;
  type?: any;
} {
  let networkInfo = {
    downlink: null,
    effectiveType: null,
    rtt: null,
    saveData: false,
  };

  const navigatorWithConnection = navigator as NavigatorWithConnection;
  const connect = navigatorWithConnection?.connection;
  const connectType = connect?.type;

  if (navigatorWithConnection?.connection !== null) {
    const connection = navigatorWithConnection?.connection;
    networkInfo = {
      // @ts-expect-error - downlink is not defined in the Navigator interface
      downlink: connection?.downlink,
      // @ts-expect-error - effectiveType is not defined in the Navigator interface
      effectiveType: connection?.effectiveType,
      // @ts-expect-error - rtt is not defined in the Navigator interface
      rtt: connection?.rtt,
      saveData: connection?.saveData ?? false,
    };
    // @ts-expect-error - downlink is not defined in the Navigator interface
  } else if (navigatorWithConnection?.webkitConnection !== null) {
    // Fallback for iOS devices
    // @ts-expect-error - downlink is not defined in the Navigator interface
    const connection = navigatorWithConnection?.webkitConnection;
    networkInfo = {
      downlink: connection?.downlink,
      effectiveType: connection?.effectiveType,
      rtt: connection?.rtt,
      saveData: connection?.saveData,
    };
    // @ts-expect-error - downlink is not defined in the Navigator interface
  } else if (navigatorWithConnection?.mozConnection !== null) {
    // Fallback for Firefox
    // @ts-expect-errors - downlink is not defined in the Navigator interface
    const connection = navigatorWithConnection?.mozConnection;
    networkInfo = {
      downlink: connection?.downlink,
      effectiveType: connection?.effectiveType,
      rtt: connection?.rtt,
      saveData: connection?.saveData,
    };
  } else if (connectType !== null) {
    // Fallback for older versions of Chrome
    networkInfo = {
      downlink: null,
      // @ts-expect-errors - effectiveType is not defined in the Navigator interface
      effectiveType: navigatorWithConnection?.connection?.type,
      rtt: null,
      saveData: false,
    };
  } else {
    // Fallback for other devices
    networkInfo = {
      downlink: null,
      effectiveType: null,
      rtt: null,
      saveData: false,
    };
  }

  return networkInfo;
}

export function deviceTypeCapture(): {
  tier: string;
  tierLevel: string;
  clientInfo: object;
  timestamp: number;
  tierDetails: {
    cpu: number;
    ram: number;
    connection: string | null;
    connectionRTT: number | null;
    connectionDownlink: number | null;
    saveDataMode: boolean | null;
  };
} {
  if (typeof window !== "undefined") {
    const cpu = navigator?.hardwareConcurrency;
    // @ts-expect-error - deviceMemory is not defined in the Navigator interface
    const ram = navigator?.deviceMemory;
    const connection = getNetworkInformation();
    const clientInfo = getClientInfo();
    const timestamp = getCurrentTimestamp();
    let tier;
    let tierLevel;

    if (
      (cpu <= 2 && ram <= 2) ||
      // @ts-expect-error - downlink is not defined in the Navigator interface
      (connection?.rtt >= 1000 &&
        (connection?.effectiveType === "3g" ||
          connection?.effectiveType === "2g" ||
          connection?.effectiveType === "slow-2g"))
    ) {
      tier = "low-end";
      tierLevel = "L";
    } else if (
      (cpu >= 4 && ram >= 6) ||
      // @ts-expect-error - downlink is not defined in the Navigator interface
      ((connection?.downlink >= 1 || connection?.rtt < 500) &&
        connection?.effectiveType === "4g")
    ) {
      tier = "high-end";
      tierLevel = "H";
    } else {
      tier = "mid-range";
      tierLevel = "M";
    }
    return {
      tier,
      tierLevel,
      timestamp,
      clientInfo,
      tierDetails: {
        cpu,
        ram,
        connection: connection?.effectiveType,
        connectionRTT: connection?.rtt,
        connectionDownlink: connection?.downlink,
        saveDataMode: connection?.saveData,
      },
    };
  } else {
    return {
      tier: "unknown",
      tierLevel: "unknown",
      timestamp: getCurrentTimestamp(),
      clientInfo: getClientInfo(),
      tierDetails: {
        cpu: 0,
        ram: 0,
        connection: null,
        connectionRTT: null,
        connectionDownlink: null,
        saveDataMode: false,
      },
    };
  }
}
