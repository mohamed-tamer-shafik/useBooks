import { useRef, useState } from "react";
const key = "AIzaSyC2mo8syioi8QAapVmCpYH13V90NzlQovs";
export function useGoogleBooks(handleHideBookInfo, setToggleContainers) {
  const abortControllerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const handleFieldControl = (fieldValue) => setSearchQuery(fieldValue);
  const [fetchingStatus, setFetchingStatus] = useState(
    "please search with at least 4 characters search query 🔍"
  );
  const [books, setBooks] = useState([]);

  async function handleFetchBooks(searchQuery) {
    try {
      if (abortControllerRef.current) abortControllerRef.current.abort();

      // searching using server side search here is not best practice it is only done for training reasons
      // search using js will be better and fast and also best practice as all the dataset of 40 books will be fetched intially
      setFetchingStatus("loading...⌛");
      const url = `https://www.googleapis.com/books/v1/volumes?q=subject:software+intitle:"${searchQuery}"&langRestrict=en&maxResults=40&key=${key}`;
      const controller = new AbortController();
      abortControllerRef.current = controller;
      const res = await fetch(url, { signal: controller.signal });
      if (!res.status)
        throw new Error("Something went wrong with the requesting data ❌");
      const data = await res.json();
      if (!data.totalItems) throw new Error("No book found ⛔");
      /*this filter is implemented to filter the api data retuened if there is because the api don't allow to strict the 
    returned books title with search query it return books related to search query from alot of aspects
    other than the title only so we tried at the api the server quering to strict the result books title with the search query
    as much as the api allow us but at the end we will need local filter to make sure that the displayed books title 100% match
    the search query */
      const strictTitleBooks = data.items.filter(({ volumeInfo: { title } }) =>
        title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );
      if (!strictTitleBooks.length) throw new Error("No book found ⛔");
      setBooks(strictTitleBooks);
      setFetchingStatus(null);
    } catch (err) {
      if (err.name !== "AbortError") setFetchingStatus(err.message);
    }
  }
  function handleSearchChange(e) {
    handleHideBookInfo();
    setToggleContainers(true);
    const fieldInput = e.target.value;
    handleFieldControl(fieldInput);
    if (fieldInput.length < 4) {
      if (abortControllerRef.current) abortControllerRef.current.abort();
      setFetchingStatus(
        "please search with at least 4 characters search query 🔍"
      );
      return;
    }
    handleFetchBooks(fieldInput);
  }
  return {
    searchQuery,
    setSearchQuery,
    fetchingStatus,
    books,
    handleSearchChange,
  };
}
