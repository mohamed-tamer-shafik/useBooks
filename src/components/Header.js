export default function Header({ children }) {
  return (
    <header className="header flex space-between align-center mb-xl ">
      <div className="header__logo fw-600">📚 useBooks</div>
      {children}
    </header>
  );
}
