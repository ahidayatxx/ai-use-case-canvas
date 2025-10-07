import { useEffect } from 'react';

export type KeyboardShortcut = {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
};

interface UseKeyboardShortcutOptions {
  enabled?: boolean;
  preventDefault?: boolean;
}

/**
 * Hook to handle keyboard shortcuts
 * @param shortcut - The keyboard shortcut configuration
 * @param callback - Function to call when shortcut is pressed
 * @param options - Additional options
 */
export function useKeyboardShortcut(
  shortcut: KeyboardShortcut,
  callback: () => void,
  options: UseKeyboardShortcutOptions = {}
) {
  const { enabled = true, preventDefault = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const { key, ctrl = false, shift = false, alt = false, meta = false } = shortcut;

      const isCtrlMatch = ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
      const isShiftMatch = shift ? event.shiftKey : !event.shiftKey;
      const isAltMatch = alt ? event.altKey : !event.altKey;
      const isMetaMatch = meta ? event.metaKey : !event.metaKey;
      const isKeyMatch = event.key.toLowerCase() === key.toLowerCase();

      if (isKeyMatch && isCtrlMatch && isShiftMatch && isAltMatch && isMetaMatch) {
        if (preventDefault) {
          event.preventDefault();
        }
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcut, callback, enabled, preventDefault]);
}

/**
 * Hook to handle multiple keyboard shortcuts
 */
export function useKeyboardShortcuts(
  shortcuts: Array<{ shortcut: KeyboardShortcut; callback: () => void; enabled?: boolean }>
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      for (const { shortcut, callback, enabled = true } of shortcuts) {
        if (!enabled) continue;

        const { key, ctrl = false, shift = false, alt = false, meta = false } = shortcut;

        const isCtrlMatch = ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
        const isShiftMatch = shift ? event.shiftKey : !event.shiftKey;
        const isAltMatch = alt ? event.altKey : !event.altKey;
        const isMetaMatch = meta ? event.metaKey : !event.metaKey;
        const isKeyMatch = event.key.toLowerCase() === key.toLowerCase();

        if (isKeyMatch && isCtrlMatch && isShiftMatch && isAltMatch && isMetaMatch) {
          event.preventDefault();
          callback();
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);
}
