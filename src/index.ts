interface NavigatorWithConnection extends Navigator {
  connection?: {
    downlink: number | null;
    effectiveType: string | null;
    rtt: number | null;
    saveData: boolean;
    type?: string | null;
  };
}

function getNetworkInformation(): {
  downlink: number | null;
  effectiveType: string | null;
  rtt: number | null;
  saveData: boolean;
} {
  let networkInfo = {
    downlink: null,
    effectiveType: null,
    rtt: null,
    saveData: false,
  };

  const navigatorWithConnection = navigator as NavigatorWithConnection;

  if (navigatorWithConnection?.connection) {
    const connection = navigatorWithConnection.connection;

    networkInfo = {
      // @ts-ignore
      downlink: connection.downlink,
      // @ts-ignore
      effectiveType: connection.effectiveType,
      // @ts-ignore
      rtt: connection.rtt,
      saveData: connection.saveData,
    };
    // @ts-ignore
  } else if (navigatorWithConnection?.webkitConnection) {
    // Fallback for iOS devices
    // @ts-ignore
    const connection = navigatorWithConnection.webkitConnection;
    networkInfo = {
      downlink: connection.downlink,
      effectiveType: connection.effectiveType,
      rtt: connection.rtt,
      saveData: connection.saveData,
    };
    // @ts-ignore
  } else if (navigatorWithConnection?.mozConnection) {
    // Fallback for Firefox
    // @ts-ignores
    const connection = navigatorWithConnection.mozConnection;
    networkInfo = {
      downlink: connection.downlink,
      effectiveType: connection.effectiveType,
      rtt: connection.rtt,
      saveData: connection.saveData,
    };
  } else if (navigatorWithConnection?.connection?.type) {
    // Fallback for older versions of Chrome
    networkInfo = {
      downlink: null,
      // @ts-ignores
      effectiveType: navigatorWithConnection.connection.type,
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

function getDeviceTier(): {
  tier: string;
  tierLevel: string;
  tierDetails: {
    cpu: number;
    ram: number;
    connection: string | null;
    connectionRTT: number | null;
    connectionDownlink: number | null;
    saveDataMode: boolean;
  };
} {
  const cpu = navigator?.hardwareConcurrency;
  // @ts-ignore
  const ram = navigator?.deviceMemory;
  const connection = getNetworkInformation();
  let tier;
  let tierLevel;

  if (
    (cpu <= 2 && ram <= 2) ||
    // @ts-ignore
    (connection?.rtt >= 1000 &&
      (connection.effectiveType == "3g" ||
        connection.effectiveType == "2g" ||
        connection.effectiveType == "slow-2g"))
  ) {
    tier = "low-end";
    tierLevel = "L";
  } else if (
    (cpu >= 4 && ram >= 6) ||
    // @ts-ignore
    ((connection?.downlink >= 1 || connection?.rtt < 500) &&
      connection?.effectiveType == "4g")
  ) {
    tier = "high-end";
    tierLevel = "H";
  } else {
    tier = "mid-range";
    tierLevel = "M";
  }
  return {
    tier: tier,
    tierLevel: tierLevel,
    tierDetails: {
      cpu: cpu,
      ram: ram,
      connection: connection?.effectiveType,
      connectionRTT: connection?.rtt,
      connectionDownlink: connection?.downlink,
      saveDataMode: connection?.saveData,
    },
  };
}

module.exports = getDeviceTier;
