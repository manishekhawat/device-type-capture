# @techbana/device-type-capture

### This package helps identify and capture the device type (High/Medium/Low end based on connection quality, cpu, ram, saveData mode etc.) to give an option to use it for A/B test on client side, feature enable/disable etc.

> ### _Note: This package can do what it promises, however this package is still under active development for feature enhancements. Please contribute back if you are able to find bugs/issues or want to contribute feature update to the package._

> _Keeping this package as open source for everyone to know how identification of device type or tier could be done._

## Installation

`npm i @techbana/device-type-capture`

## Usage

Simple

```

import deviceTypeCapture from "@techbana/device-type-capture";

const tier =  deviceTypeCapture();
console.log(tier)

```

### Client side device capture

```

{
    "tier": "high-end",
    "tierLevel": "H",
    "clientInfo": {
        "userAgent": "Mozilla/5.0 (Macintosh;) AppleWebKit/5 (KHTML, like Gecko) Chrome/11.0.0.0 Safari/5.36",
        "language": "en-GB",
        "platform": "Mac",
        "screenWidth": 1290,
        "screenHeight": 900,
        "browserName": "Firefox",
        "browserVersion": "12.0.0.0"
    },
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

## Features:

- Notify if the device is high-end, low-end, mid-range device based on cpu, ram and network information
- Captures below information:
  - CPU
  - RAM
  - connection
  - connection RTT
  - connectionDownlink
  - saveDataMode
  - clientInfo

## Contributing

The main purpose of this repository is to continue evolving `@techbana`, making it faster and easier to use. Development of `@techbana` happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving `@techbana`.

### Code of Conduct

We have adopted a Code of Conduct that we expect project participants to adhere to. Please read [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

### Contributing Guide

Read our [contributing guide](./CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to `@techbana`.

### Good First Issues

To help you get your feet wet and get you familiar with our contribution process, we have a list of [good first issues](https://github.com/manishekhawat/device-type-capture/labels/good%20first%20issue) that contain bugs that have a relatively limited scope. This is a great place to get started.

### License

`@techbana` is [MIT licensed](./LICENSE).
