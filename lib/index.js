"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceTypeCapture = void 0;
function getCurrentTimestamp() {
    return Date.now();
}
function getClientInfo() {
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
    }
    else {
        return {
            node: true,
            nodeVersion: process.version,
        };
    }
}
function getBrowserName() {
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
    }
    else {
        return {
            node: true,
            nodeVersion: process.version,
        };
    }
}
function getBrowserVersion() {
    // Retrieve the version of the current browser
    if (typeof window !== "undefined") {
        const userAgent = navigator.userAgent;
        const regex = /(Chrome|Firefox|Safari|Edge|MSIE|Trident)\/([\d.]+)/;
        const match = userAgent.match(regex);
        return match != null ? match[2] : "Unknown";
    }
    else {
        return {
            node: true,
            nodeVersion: process.version,
        };
    }
}
function getNetworkInformation() {
    var _a, _b;
    let networkInfo = {
        downlink: null,
        effectiveType: null,
        rtt: null,
        saveData: false,
    };
    const navigatorWithConnection = navigator;
    const connect = navigatorWithConnection === null || navigatorWithConnection === void 0 ? void 0 : navigatorWithConnection.connection;
    const connectType = connect === null || connect === void 0 ? void 0 : connect.type;
    if ((navigatorWithConnection === null || navigatorWithConnection === void 0 ? void 0 : navigatorWithConnection.connection) !== null) {
        const connection = navigatorWithConnection === null || navigatorWithConnection === void 0 ? void 0 : navigatorWithConnection.connection;
        networkInfo = {
            // @ts-expect-error - downlink is not defined in the Navigator interface
            downlink: connection === null || connection === void 0 ? void 0 : connection.downlink,
            // @ts-expect-error - effectiveType is not defined in the Navigator interface
            effectiveType: connection === null || connection === void 0 ? void 0 : connection.effectiveType,
            // @ts-expect-error - rtt is not defined in the Navigator interface
            rtt: connection === null || connection === void 0 ? void 0 : connection.rtt,
            saveData: (_a = connection === null || connection === void 0 ? void 0 : connection.saveData) !== null && _a !== void 0 ? _a : false,
        };
        // @ts-expect-error - downlink is not defined in the Navigator interface
    }
    else if ((navigatorWithConnection === null || navigatorWithConnection === void 0 ? void 0 : navigatorWithConnection.webkitConnection) !== null) {
        // Fallback for iOS devices
        // @ts-expect-error - downlink is not defined in the Navigator interface
        const connection = navigatorWithConnection === null || navigatorWithConnection === void 0 ? void 0 : navigatorWithConnection.webkitConnection;
        networkInfo = {
            downlink: connection === null || connection === void 0 ? void 0 : connection.downlink,
            effectiveType: connection === null || connection === void 0 ? void 0 : connection.effectiveType,
            rtt: connection === null || connection === void 0 ? void 0 : connection.rtt,
            saveData: connection === null || connection === void 0 ? void 0 : connection.saveData,
        };
        // @ts-expect-error - downlink is not defined in the Navigator interface
    }
    else if ((navigatorWithConnection === null || navigatorWithConnection === void 0 ? void 0 : navigatorWithConnection.mozConnection) !== null) {
        // Fallback for Firefox
        // @ts-expect-errors - downlink is not defined in the Navigator interface
        const connection = navigatorWithConnection === null || navigatorWithConnection === void 0 ? void 0 : navigatorWithConnection.mozConnection;
        networkInfo = {
            downlink: connection === null || connection === void 0 ? void 0 : connection.downlink,
            effectiveType: connection === null || connection === void 0 ? void 0 : connection.effectiveType,
            rtt: connection === null || connection === void 0 ? void 0 : connection.rtt,
            saveData: connection === null || connection === void 0 ? void 0 : connection.saveData,
        };
    }
    else if (connectType !== null) {
        // Fallback for older versions of Chrome
        networkInfo = {
            downlink: null,
            // @ts-expect-errors - effectiveType is not defined in the Navigator interface
            effectiveType: (_b = navigatorWithConnection === null || navigatorWithConnection === void 0 ? void 0 : navigatorWithConnection.connection) === null || _b === void 0 ? void 0 : _b.type,
            rtt: null,
            saveData: false,
        };
    }
    else {
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
function deviceTypeCapture() {
    if (typeof window !== "undefined") {
        const cpu = navigator === null || navigator === void 0 ? void 0 : navigator.hardwareConcurrency;
        // @ts-expect-error - deviceMemory is not defined in the Navigator interface
        const ram = navigator === null || navigator === void 0 ? void 0 : navigator.deviceMemory;
        const connection = getNetworkInformation();
        const clientInfo = getClientInfo();
        const timestamp = getCurrentTimestamp();
        let tier;
        let tierLevel;
        if ((cpu <= 2 && ram <= 2) ||
            // @ts-expect-error - downlink is not defined in the Navigator interface
            ((connection === null || connection === void 0 ? void 0 : connection.rtt) >= 1000 &&
                ((connection === null || connection === void 0 ? void 0 : connection.effectiveType) === "3g" ||
                    (connection === null || connection === void 0 ? void 0 : connection.effectiveType) === "2g" ||
                    (connection === null || connection === void 0 ? void 0 : connection.effectiveType) === "slow-2g"))) {
            tier = "low-end";
            tierLevel = "L";
        }
        else if ((cpu >= 4 && ram >= 6) ||
            // @ts-expect-error - downlink is not defined in the Navigator interface
            (((connection === null || connection === void 0 ? void 0 : connection.downlink) >= 1 || (connection === null || connection === void 0 ? void 0 : connection.rtt) < 500) &&
                (connection === null || connection === void 0 ? void 0 : connection.effectiveType) === "4g")) {
            tier = "high-end";
            tierLevel = "H";
        }
        else {
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
                connection: connection === null || connection === void 0 ? void 0 : connection.effectiveType,
                connectionRTT: connection === null || connection === void 0 ? void 0 : connection.rtt,
                connectionDownlink: connection === null || connection === void 0 ? void 0 : connection.downlink,
                saveDataMode: connection === null || connection === void 0 ? void 0 : connection.saveData,
            },
        };
    }
    else {
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
exports.deviceTypeCapture = deviceTypeCapture;
