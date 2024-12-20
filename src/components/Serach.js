import { useRef } from "react";
import { useKeyEvents } from "../hooks/useKeyEvents";

export default function Search({
  searchQuery,
  setSearchQuery,
  onSearchChange,
}) {
  const searchFieldEl = useRef(null);
  useKeyEvents("Enter", action, intialCallBack);
  function action() {
    if (document.activeElement === searchFieldEl.current) return;
    setSearchQuery("");
    intialCallBack();
  }
  function intialCallBack() {
    searchFieldEl.current.focus();
  }
  return (
    <input
      type="text"
      placeholder="Search books..."
      className="header__search primary-color border-radius-6 "
      value={searchQuery}
      onChange={onSearchChange}
      ref={searchFieldEl}
    />
  );
}
