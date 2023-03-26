# @techbana/device-type-capture

### This package helps identify and capture the device type (High/Medium/Low end based on connection quality, cpu, ram, saveData mode etc.) to give an option to use it for A/B test on client side, feature enable/disable etc.

> ### _Note: While this package can do what it promises but yet, this package is still under development and **NOT ready for production use**. Please contribute back if you are able to find bugs/issues or want to contribute feature update to the package._

> _Keeping this package as open source for everyone to know how identification of device type or tier could be done._

### Install

`npm i @techbana/device-type-capture`

### Usage

Simple

```

import getDeviceTier from "@techbana/device-type-capture";

const tier =  getDeviceTier();
console.log(tier)

```

### Client side device capture

```

{
    "tier": "high-end",
    "tierLevel": "H",
    "tierDetails": {
        "cpu": 8,
        "ram": 8,
        "connection": "4g",
        "connectionRTT": 50,
        "connectionDownlink": 1.5,
        "saveDataMode": false
    }
}

```

### Features:

- Notify if the device is high-end, low-end, mid-range device based on cpu, ram and network information
- Captures below information:
  - CPU
  - RAM
  - connection
  - connection RTT
  - connectionDownlink
  - saveDataMode
