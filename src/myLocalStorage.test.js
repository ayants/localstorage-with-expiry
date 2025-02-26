import { beforeAll, describe, expect, test, vi } from "vitest"
import myLocalStorage from "./myLocalStorage"


beforeAll(async()=>{
    vi.useFakeTimers()
    localStorage.clear()
})

describe("Test local storage with expiry", async()=>{
    test("Should store and retrieve an item before expiry", async()=>{
        const key = "testKey"
        const value = "testValue"
        const expiry = 200000
        myLocalStorage.setItem(key, value, expiry)
        vi.advanceTimersByTime(100000)
        const result = myLocalStorage.getItem(key)
        expect(result).toBe(value)
    })
    test("Should return null for expired item", async()=>{
        const key = "testKey"
        const value  = "testValue"
        const expiry = 1000
        myLocalStorage.setItem(key, value, expiry)
        vi.advanceTimersByTime(2000)
        const result = myLocalStorage.getItem(key)
        expect(result).toBe(null)
    })
    test("Should return null if item does not exist", async()=>{
        const result = myLocalStorage.getItem("nonExistentKey")
        expect(result).toBe(null)
    })
    test("Should handle multiple keys with different expiry", async()=>{
        const key1 = "testKey1"
        const value1 = "testValue1"
        const expiry1 = 200000
        const key2 = "testKey2"
        const value2 = "testValue2"
        const expiry2 = 300000
        myLocalStorage.setItem(key1, value1, expiry1)
        myLocalStorage.setItem(key2, value2, expiry2)
        vi.advanceTimersByTime(100000)
        const result1 = myLocalStorage.getItem(key1)
        const result2 = myLocalStorage.getItem(key2)
        expect(result1).toBe(value1)
        expect(result2).toBe(value2)
    })

})