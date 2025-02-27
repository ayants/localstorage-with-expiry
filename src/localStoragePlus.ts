/**
 * A custom local storage implementation that stores data with an expiry time.
 * @namespace localStoragePlus
 * @example
 * Set an item with an expiry time of 200000 milliseconds (200 seconds)
 * localStoragePlus.setItem("testKey", "testValue", 200000);
 *
 * Retrieve the item
 * const result = localStoragePlus.getItem("testKey");
 * console.log(result); // "testValue" (if not expired)
 */

interface StoredValue<T> {
  value: T;
  expiry: number;
}

const localStoragePlus = {
  /**
   * Sets an item in local storage with an expiry time.
   * @param key - The key under which the value will be stored.
   * @param value - The value to be stored. This will be serialized to JSON.
   * @param expiry - The expiry time in milliseconds from the current time.
   * @example
   * localStoragePlus.setItem("testKey", "testValue", 200000); // Expires in 200 seconds
   */
  setItem<T>(key: string, value: T, expiry: number): void {
    if (!key || expiry <= 0) return;
    const valueToSave: StoredValue<T> = {
      value,
      expiry: Date.now() + expiry,
    };
    try {
      localStorage.setItem(key, JSON.stringify(valueToSave));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  },

  /**
   * Retrieves an item from local storage if it has not expired.
   * @param key - The key of the item to retrieve.
   * @returns The stored value if the item is not expired, otherwise `null`.
   * @example
   * const result = localStoragePlus.getItem("testKey");
   * console.log(result); // "testValue" (if not expired), otherwise `null`
   */
  getItem<T>(key: string): T | null {
    if (!key) return null;
    const savedValue = localStorage.getItem(key);
    if (!savedValue) return null;

    try {
      const parsedValue: StoredValue<T> = JSON.parse(savedValue);
      if (typeof parsedValue.expiry !== "number" || parsedValue.expiry <= 0) {
        localStorage.removeItem(key);
        return null;
      }

      if (parsedValue.expiry > Date.now()) {
        return parsedValue.value;
      } else {
        localStorage.removeItem(key); // Remove expired item
        return null;
      }
    } catch (error) {
      console.error("Error retrieving from localStorage:", error);
      return null;
    }
  },

  /**
   * Removes a specific item from local storage.
   * @param key - The key of the item to remove.
   */
  removeItem(key: string): void {
    if (!key) return;
    localStorage.removeItem(key);
  },

  /**
   * Clears all stored items in local storage.
   */
  clear(): void {
    localStorage.clear();
  },
};

export default localStoragePlus;
