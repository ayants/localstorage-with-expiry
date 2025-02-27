# localStoragePlus

A utility that extends the browser's `localStorage` to support automatic expiration of stored items.

## Features
- Store data with an expiration time.
- Automatically removes expired items.
- Simple API for setting and retrieving items.

## Installation

You can install the package using npm:

```sh
npm install localStoragePlus
```

Or use it directly in your project by copying `localStoragePlus.js`.

## Usage

### Importing

```javascript
import localStoragePlus from "./localStoragePlus";
```

### Setting an Item

Use `setItem` to store an item with an expiry time (in milliseconds):

```javascript
localStoragePlus.setItem("testKey", "testValue", 200000); // Expires in 200 seconds
```

### Getting an Item

Use `getItem` to retrieve an item. If it is expired or doesn't exist, it returns `null`:

```javascript
const result = localStoragePlus.getItem("testKey");
console.log(result); // "testValue" (if not expired), otherwise `null`
```

## Testing

This project uses `vitest` for testing. To run the tests:

```sh
npm test
```

## Project Structure

```
localStoragePlus/
│── localStoragePlus.js  # Main localStorage utility
│── localStoragePlus.test.js  # Tests using Vitest
│── package.json  # Project metadata
│── README.md  # Documentation
```

## API Reference

### `localStoragePlus.setItem(key: string, value: any, expiry: number)`
Stores a value in localStorage with an expiry time.

- `key` (string): The key to store the value under.
- `value` (any): The value to store (serialized as JSON).
- `expiry` (number): Expiry time in milliseconds from now.

### `localStoragePlus.getItem(key: string): any | null`
Retrieves a value from localStorage if it has not expired.

- `key` (string): The key of the item to retrieve.
- Returns the stored value if not expired, otherwise `null`.

## License

This project is licensed under the MIT License.

## Author

[github.com/ayanonline](https://github.com/typescript-any)

