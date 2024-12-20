import Header from "./Header";
import Container from "./Container";
import BooksList from "./BooksList";
import ReadBooksStats from "./ReadBooksStats";
import ReadBooksList from "./ReadBooksList";
import Search from "./Serach";
import ResultsStats from "./ResultsStats";
import FetchingStatus from "./FetchingStatus";
import Book from "./Book";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import BookTotalDetails from "./BookTotalDetails";
import ReadBook from "./ReadBook";
import { useGoogleBooks } from "../hooks/useGoogleBooks";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

export default function App() {
  const isLargeScreen = useMediaQuery({ minWidth: 768 });
  const [toggleContainers, setToggleContainers] = useState(true);
  const handleToggleContainers = () => setToggleContainers((curr) => !curr);
  const [selectedBook, setSelectedBook] = useState(null);
  function handleBookSelection(bookObj) {
    setSelectedBook((selectedBook) =>
      selectedBook?.id === bookObj.id ? null : bookObj
    );
    handleToggleContainers();
  }
  function handleHideBookInfo() {
    setSelectedBook(null);
  }
  const {
    searchQuery,
    setSearchQuery,
    fetchingStatus,
    books,
    handleSearchChange,
  } = useGoogleBooks(handleHideBookInfo, setToggleContainers);
  const [readBooks, setReadBooks] = useLocalStorageState([], "readBooks");
  const handleAddingBook = (book) =>
    setReadBooks((readBooks) => [...readBooks, book]);
  const handleBookRemove = (bookId) =>
    setReadBooks((readBooks) =>
      readBooks.filter((bookObj) => bookObj.id !== bookId)
    );

  return (
    <div className="app flex flex-column">
      <Header>
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchChange={handleSearchChange}
        />
        <ResultsStats books={books} />
      </Header>
      <main className="main fg-1 height-1">
        {!isLargeScreen &&
          (toggleContainers ? (
            <Container
              arrowDirection="&rarr;"
              arrowModifier="main__arrow-btn--right"
              dropBtnModifier="main__dorp-btn--left"
              onArrowClick={handleToggleContainers}
            >
              {fetchingStatus ? (
                <FetchingStatus status={fetchingStatus} />
              ) : (
                <BooksList>
                  {books.map((book) => (
                    <Book
                      key={book.id}
                      bookObj={book}
                      onBookSelection={handleBookSelection}
                    />
                  ))}
                </BooksList>
              )}
            </Container>
          ) : (
            <Container
              arrowDirection="&larr;"
              arrowModifier="main__arrow-btn--left"
              dropBtnModifier="main__dorp-btn--right"
              onArrowClick={
                selectedBook ? handleHideBookInfo : handleToggleContainers
              }
            >
              {selectedBook ? (
                <BookTotalDetails
                  selectedBook={selectedBook}
                  readBooks={readBooks}
                  onAddingBook={handleAddingBook}
                  onHideBookInfo={handleHideBookInfo}
                />
              ) : (
                <>
                  <ReadBooksStats readBooks={readBooks} />
                  <ReadBooksList readBooks={readBooks}>
                    {readBooks.map((book) => (
                      <ReadBook
                        readBookObj={book}
                        key={book.id}
                        onBookRemove={handleBookRemove}
                      />
                    ))}
                  </ReadBooksList>
                </>
              )}
            </Container>
          ))}
        {isLargeScreen && (
          <>
            <Container
              arrowDirection="&rarr;"
              arrowModifier="main__arrow-btn--right main__arrow-btn--hidden"
              dropBtnModifier="main__dorp-btn--left"
            >
              {fetchingStatus ? (
                <FetchingStatus status={fetchingStatus} />
              ) : (
                <BooksList>
                  {books.map((book) => (
                    <Book
                      key={book.id}
                      bookObj={book}
                      onBookSelection={handleBookSelection}
                    />
                  ))}
                </BooksList>
              )}
            </Container>
            <Container
              arrowDirection="&larr;"
              arrowModifier={`main__arrow-btn--left ${
                selectedBook ? "" : "main__arrow-btn--hidden"
              }`}
              dropBtnModifier="main__dorp-btn--right"
              onArrowClick={handleHideBookInfo}
            >
              {selectedBook ? (
                <BookTotalDetails
                  selectedBook={selectedBook}
                  readBooks={readBooks}
                  onAddingBook={handleAddingBook}
                  onHideBookInfo={handleHideBookInfo}
                  key={selectedBook.id}
                />
              ) : (
                <>
                  <ReadBooksStats readBooks={readBooks} />
                  <ReadBooksList readBooks={readBooks}>
                    {readBooks.map((book) => (
                      <ReadBook
                        readBookObj={book}
                        key={book.id}
                        onBookRemove={handleBookRemove}
                      />
                    ))}
                  </ReadBooksList>
                </>
              )}
            </Container>
          </>
        )}
      </main>
    </div>
  );
}
