export default function WatchedMoviesStats({ readBooks }) {
  const stats = {
    totalCommunityRate: 0,
    totalUsersRate: 0,
    totalPageNumber: 0,
  };
  readBooks.forEach(function ({ communityRate, rate, pageCount }) {
    stats.totalCommunityRate += communityRate;
    stats.totalUsersRate += rate;
    stats.totalPageNumber += pageCount;
  });
  const statsFinalForm = [
    `#️⃣ ${readBooks.length} books`,
    `⭐ ${(stats.totalCommunityRate / readBooks.length || 0).toFixed(2)}`,
    `🌟 ${(stats.totalUsersRate / readBooks.length || 0).toFixed(2)}`,
    `📄 ${stats.totalPageNumber} pages`,
  ];
  return (
    <div className="main__books-stats-container  border-radius-6 secondary-color ">
      <h3 className="main__books-stats-title mb-sm fw-700">books you read</h3>
      <ul className="main__books-stats flex space-between">
        {statsFinalForm.map((stat, index) => (
          <li className="main__books-stat fw-600" key={index}>
            {stat}
          </li>
        ))}
      </ul>
    </div>
  );
}
