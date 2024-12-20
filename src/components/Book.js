export default function Book({ bookObj, onBookSelection }) {
  const { title, publishedDate } = bookObj.volumeInfo;
  const year = !publishedDate
    ? "UKNOWN"
    : publishedDate.length > 4
    ? publishedDate.slice(0, 4)
    : publishedDate;
  const poster =
    bookObj.volumeInfo.imageLinks?.smallThumbnail ?? "default book.png";
  return (
    <li
      className="main__book flex pointer align-center"
      onClick={() => onBookSelection(bookObj)}
    >
      <img src={poster} alt="book cover" className="main__book-img" />
      <div className="main__book-details">
        <h3 className="main__movie-name fz-18 mb-sm">{title}</h3>
        <span className="main__book-release-date">{`📅 ${year}`}</span>
      </div>
    </li>
  );
}
