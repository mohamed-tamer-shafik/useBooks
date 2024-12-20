export default function ReadBook({
  readBookObj: { id, img, title, communityRate, rate, pageCount },
  onBookRemove,
}) {
  const bookStats = [
    `⭐ ${communityRate}`,
    `🌟 ${rate}`,
    `📄 ${pageCount} pages`,
  ];
  return (
    <li className="main__read-book flex align-center">
      <img src={img} alt="read book" className="main__read-book-img" />
      <div className="main__read-book-text fg-1">
        <h3 className="main__read-book-title fz-18 mb-sm">{title}</h3>
        <div className="main__read-book-information-container flex space-between">
          <ul className="main__read-book-information flex">
            {bookStats.map((info, index) => (
              <li className="main__read-book-info" key={index}>
                {info}
              </li>
            ))}
          </ul>
          <button
            className="main__read-book-x-btn pointer"
            onClick={() => onBookRemove(id)}
          >
            x
          </button>
        </div>
      </div>
    </li>
  );
}
