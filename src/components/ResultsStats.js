export default function ResultsStats({ books }) {
  const inSearchBooks = books.length;
  return (
    <div className="header__stats">
      Found <span className="header__results-number">{inSearchBooks}</span>{" "}
      results
    </div>
  );
}
