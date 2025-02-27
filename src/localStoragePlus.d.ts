declare module "localStoragePlus" {
    export function setItem<T>(key: string, value: T, expiry: number): void;
    export function getItem<T>(key: string): T | null;
    export function removeItem(key: string): void;
    export function clear(): void;
  }
  