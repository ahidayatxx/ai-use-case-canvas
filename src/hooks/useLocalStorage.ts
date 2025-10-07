import { useState, useEffect } from 'react';

/**
 * Hook for managing localStorage with React state
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Save state
      setStoredValue(valueToStore);

      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  return [storedValue, setValue];
}

/**
 * Hook for managing a specific item in an array stored in localStorage
 */
export function useLocalStorageItem<T extends { id: string }>(
  storageKey: string,
  itemId: string | null
): [T | null, (item: T) => void, () => void] {
  const [items, setItems] = useLocalStorage<T[]>(storageKey, []);
  const [item, setItem] = useState<T | null>(null);

  // Load item when itemId changes
  useEffect(() => {
    if (!itemId) {
      setItem(null);
      return;
    }

    const foundItem = items.find(i => i.id === itemId);
    setItem(foundItem || null);
  }, [itemId, items]);

  // Save item
  const saveItem = (updatedItem: T) => {
    const index = items.findIndex(i => i.id === updatedItem.id);

    if (index >= 0) {
      // Update existing
      const newItems = [...items];
      newItems[index] = updatedItem;
      setItems(newItems);
    } else {
      // Add new
      setItems([...items, updatedItem]);
    }

    setItem(updatedItem);
  };

  // Delete item
  const deleteItem = () => {
    if (!itemId) return;

    const filtered = items.filter(i => i.id !== itemId);
    setItems(filtered);
    setItem(null);
  };

  return [item, saveItem, deleteItem];
}
