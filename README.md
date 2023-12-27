# TimeTrackerX JavaScript SDK

[![npm version](https://badge.fury.io/js/%40timetrackerx%2Fjs-sdk.svg)](https://badge.fury.io/js/%40timetrackerx%2Fjs-sdk)
![GitHub](https://img.shields.io/github/license/TimeTrackerX/timetrackerx-sdk-js)
[![codecov](https://codecov.io/gh/TimeTrackerX/timetrackerx-sdk-js/graph/badge.svg?token=G45AZO0IW7)](https://codecov.io/gh/TimeTrackerX/timetrackerx-sdk-js)

The official JavaScript SDK for integrating with the TimeTrackerX API.

To install dependencies:

```bash
npm install @timetrackerx/js-sdk
```

## Usage

Import the SDK in your project and initialize it with either a base URL or a custom Axios instance.

```javascript
const { Auth } = require('@timetrackerx/js-sdk');

// Initialize the SDK with a base URL
const ttWithBaseUrl = new Auth({ baseUrl: 'https://your-timetrackerx-api.com' });

// OR

// Initialize the SDK with a custom Axios instance
const axios = require('axios');
const customHttp = axios.create({
    /* your custom configuration */
});
const ttWithCustomHttp = new Auth({ http: customHttp });
```

### Methods

#### `authenticateWithGoogleCode(code: string): Promise<AuthResult>`

Authenticate with Google Code and receive an authentication result.

```javascript
try {
    const { auth, error } = await ttWithBaseUrl.authenticateWithGoogleCode('your-google-code');

    if (auth) {
        console.log('Authentication successful:', auth);
    } else {
        console.error('Authentication failed:', error);
    }
} catch (err) {
    console.error('Error during authentication:', err.message);
}
```

## Configuration Options

### `baseUrl` (optional)

Specify the base URL for the TimeTrackerX API.

```javascript
const tt = new Auth({ baseUrl: 'https://your-timetrackerx-api.com' });
```

### `http` (optional)

Provide a custom Axios instance for making HTTP requests.

```javascript
const axios = require('axios');
const customHttp = axios.create({
    /* your custom configuration */
});

const tt = new Auth({ http: customHttp });
```

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
