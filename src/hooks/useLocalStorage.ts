import { useEffect, useState } from "react";

export function useLocalStorage(initialState: any, key: string) {
    const [value, setValue] = useState(function () {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : initialState;
        } catch (error) {
            console.error("Error parsing JSON from local storage:", error);
            return initialState; // Return initial state if parsing fails
        }
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue]
}