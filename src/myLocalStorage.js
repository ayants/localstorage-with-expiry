/**
 * A custom local storage implementation that stores data with an expiry time.
 * @namespace myLocalStorage
 * @example
 * Set an item with an expiry time of 200000 milliseconds (200 seconds)
 * myLocalStorage.setItem("testKey", "testValue", 200000);
 *
 * Retrieve the item
 * const result = myLocalStorage.getItem("testKey");
 * console.log(result); "testValue" (if not expired)
 */
const myLocalStorage = {
  /**
   * Sets an item in local storage with an expiry time.
   * @param {string} key - The key under which the value will be stored.
   * @param {any} value - The value to be stored. This will be serialized to JSON.
   * @param {number} expiry - The expiry time in milliseconds from the current time.
   * @example
   * myLocalStorage.setItem("testKey", "testValue", 200000); // Expires in 200 seconds
   */
  setItem: (key, value, expiry) => {
    const valueToSave = JSON.stringify({
      value,
      expiry: new Date().getTime() + expiry,
    });
    localStorage.setItem(key, valueToSave);
  },

  /**
   * Retrieves an item from local storage if it has not expired.
   * @param {string} key - The key of the item to retrieve.
   * @returns {any|null} The stored value if the item is not expired, otherwise `null`.
   * @example
   * const result = myLocalStorage.getItem("testKey");
   * console.log(result); // "testValue" (if not expired), otherwise `null`
   */
  getItem: (key) => {
    const savedValue = localStorage.getItem(key);
    try {
      const parsedValue = JSON.parse(savedValue);
      if (parsedValue.expiry > new Date().getTime()) {
        return parsedValue.value;
      } else {
        localStorage.removeItem(key); // Remove expired item
        return null;
      }
    } catch (err) {
      return null; // Return null if parsing fails (e.g., invalid JSON)
    }
  },
};

export default myLocalStorage;