import { useEffect } from "react";
export function useKeyEvents(key, action, intialCallBack) {
  useEffect(
    function () {
      intialCallBack?.();
      function handleKeyeClicking(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) action();
      }
      document.addEventListener("keydown", handleKeyeClicking);
      return () => document.removeEventListener("keydown", handleKeyeClicking);
    },
    [intialCallBack, key, action]
  );
}
