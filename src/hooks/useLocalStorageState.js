import { useState, useEffect } from "react";

export function useLocalStorageState(intialValue, key) {
  const [state, setState] = useState(
    () => JSON.parse(localStorage.getItem("readBooks")) || intialValue
  );
  useEffect(
    () => localStorage.setItem(key, JSON.stringify(state)),
    [state, key]
  );
  return [state, setState];
}
