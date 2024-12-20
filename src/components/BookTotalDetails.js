import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useKeyEvents } from "../hooks/useKeyEvents";
export default function BookTotalDetails({
  selectedBook,
  readBooks,
  onAddingBook,
  onHideBookInfo,
}) {
  const {
    title,
    publishedDate = "N/A",
    categories,
    pageCount = "N/A",
    description = `Sorry! book description isn't available`,
    authors,
    publisher = `Sorry! publisher isn't available`,
  } = selectedBook.volumeInfo;
  const img =
    selectedBook.volumeInfo.imageLinks?.thumbnail ?? "default book.png";
  const clickedRatingsNumber = useRef(0);
  const [rate, setRate] = useState(0);
  const isReadBefore = readBooks
    .map((book) => book.id)
    .includes(selectedBook.id);
  const alreadyGivenRate = isReadBefore
    ? readBooks.find((book) => book.id === selectedBook.id).rate
    : "";
  function handleAddToList() {
    const readBookInfo = {
      id: selectedBook.id,
      title,
      img,
      rate,
      communityRate: Math.floor(Math.random() * 5) + 1,
      pageCount: typeof pageCount === "string" ? 0 : pageCount,
      clickedRatingsNumber: clickedRatingsNumber.current,
    };
    onAddingBook(readBookInfo);
    onHideBookInfo();
  }
  useKeyEvents("Escape", onHideBookInfo);
  useEffect(
    function () {
      document.title = title;
      return () => (document.title = "useBook");
    },
    [title]
  );

  useEffect(
    function () {
      if (rate) clickedRatingsNumber.current++;
    },
    [rate]
  );
  return (
    <div className="main__book-total-details primary primary-color fg-1 height-1  flex flex-column">
      <header className="main__book-details-header flex ">
        <img src={img} alt="book cover" className="main__book-details-img" />
        <div className="main__book-details-header-text fg-1 secondary-color fz-14">
          <h2 className="main__book-details-title fz-18 fw-700">{title}</h2>
          <div className="main__book-details-date ">{publishedDate}</div>
          <div className="main__book-details-category ">
            {categories ? categories.join(",") : "N/A"}
          </div>
          <div className="main__book-details-pages">📃{pageCount} pages</div>
        </div>
      </header>
      <main className="main__book-details-container fg-1 fz-14">
        <div className="main__books-details-stars-container secondary-color border-radius-6 mb-xl ">
          {isReadBefore ? (
            `You rated this book ${alreadyGivenRate}`
          ) : (
            <>
              <StarRating size={25} setOuterRating={setRate} />
              {rate > 0 && (
                <button
                  className="main__books-details-add-btn primary-color fz-14 fw-700 pointer"
                  onClick={handleAddToList}
                >
                  + Add to list
                </button>
              )}
            </>
          )}
        </div>
        <div className="main__book-details-main-info">
          <em className="main__book-details-description mb-xl ">
            {description}
          </em>
          <div className="main__book-details-authors mb-xl ">
            {authors ? authors.join(",") : `Sorry! authors are't available`}
          </div>
          <span className="main__book-details-publisher">
            Published by {publisher}
          </span>
        </div>
      </main>
    </div>
  );
}
