import { useEffect } from "react";
export function useKeyEvents(key, action) {
  useEffect(
    function () {
      function handleKeyeClicking(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) action();
      }
      document.addEventListener("keydown", handleKeyeClicking);
      return () => document.removeEventListener("keydown", handleKeyeClicking);
    },
    [key, action]
  );
}
