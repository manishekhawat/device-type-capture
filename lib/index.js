"use strict";
function getNetworkInformation() {
    var _a;
    let networkInfo = {
        downlink: null,
        effectiveType: null,
        rtt: null,
        saveData: false,
    };
    const navigatorWithConnection = navigator;
    if (navigatorWithConnection === null || navigatorWithConnection === void 0 ? void 0 : navigatorWithConnection.connection) {
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
    }
    else if (navigatorWithConnection === null || navigatorWithConnection === void 0 ? void 0 : navigatorWithConnection.webkitConnection) {
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
    }
    else if (navigatorWithConnection === null || navigatorWithConnection === void 0 ? void 0 : navigatorWithConnection.mozConnection) {
        // Fallback for Firefox
        // @ts-ignores
        const connection = navigatorWithConnection.mozConnection;
        networkInfo = {
            downlink: connection.downlink,
            effectiveType: connection.effectiveType,
            rtt: connection.rtt,
            saveData: connection.saveData,
        };
    }
    else if ((_a = navigatorWithConnection === null || navigatorWithConnection === void 0 ? void 0 : navigatorWithConnection.connection) === null || _a === void 0 ? void 0 : _a.type) {
        // Fallback for older versions of Chrome
        networkInfo = {
            downlink: null,
            // @ts-ignores
            effectiveType: navigatorWithConnection.connection.type,
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
function getDeviceTier() {
    const cpu = navigator === null || navigator === void 0 ? void 0 : navigator.hardwareConcurrency;
    // @ts-ignore
    const ram = navigator === null || navigator === void 0 ? void 0 : navigator.deviceMemory;
    const connection = getNetworkInformation();
    let tier;
    let tierLevel;
    if ((cpu <= 2 && ram <= 2) ||
        // @ts-ignore
        ((connection === null || connection === void 0 ? void 0 : connection.rtt) >= 1000 &&
            (connection.effectiveType == "3g" ||
                connection.effectiveType == "2g" ||
                connection.effectiveType == "slow-2g"))) {
        tier = "low-end";
        tierLevel = "L";
    }
    else if ((cpu >= 4 && ram >= 6) ||
        // @ts-ignore
        (((connection === null || connection === void 0 ? void 0 : connection.downlink) >= 1 || (connection === null || connection === void 0 ? void 0 : connection.rtt) < 500) &&
            (connection === null || connection === void 0 ? void 0 : connection.effectiveType) == "4g")) {
        tier = "high-end";
        tierLevel = "H";
    }
    else {
        tier = "mid-range";
        tierLevel = "M";
    }
    return {
        tier: tier,
        tierLevel: tierLevel,
        tierDetails: {
            cpu: cpu,
            ram: ram,
            connection: connection === null || connection === void 0 ? void 0 : connection.effectiveType,
            connectionRTT: connection === null || connection === void 0 ? void 0 : connection.rtt,
            connectionDownlink: connection === null || connection === void 0 ? void 0 : connection.downlink,
            saveDataMode: connection === null || connection === void 0 ? void 0 : connection.saveData,
        },
    };
}
module.exports = getDeviceTier;
