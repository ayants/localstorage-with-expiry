# expiryLocalStorage

A utility that extends the browser's `localStorage` to support automatic expiration of stored items.

## Features

- Store data with an expiration time.
- Automatically removes expired items.
- Simple API for setting and retrieving items.

## Installation

You can install the package using npm:

```sh
npm i expiry-localstorage
```

## Usage

### Importing

```javascript
import expiryLocalStorage from "expiry-localstorage";
```

### Setting an Item

Use `setItem` to store an item with an expiry time (in milliseconds):

```javascript
expiryLocalStorage.setItem("testKey", "testValue", 200000); // Expires in 200 seconds
```

### Getting an Item

Use `getItem` to retrieve an item. If it is expired or doesn't exist, it returns `null`:

```javascript
const result = expiryLocalStorage.getItem("testKey");
console.log(result); // "testValue" (if not expired), otherwise `null`
```

## API Reference

### `expiryLocalStorage.setItem(key: string, value: any, expiry: number)`

Stores a value in localStorage with an expiry time.

- `key` (string): The key to store the value under.
- `value` (any): The value to store.
- `expiry` (number): Expiry time in milliseconds from now.

### `expiryLocalStorage.getItem(key: string): any | null`

Retrieves a value from localStorage if it has not expired.

- `key` (string): The key of the item to retrieve.
- Returns the stored value if not expired, otherwise `null`.

## License

This project is licensed under the MIT License.

## Author

[Ayan Ghosh](https://github.com/typescript-any)
