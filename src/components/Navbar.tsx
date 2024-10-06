
function NavBar() {
  return (
    <nav>
      <img src="/path/to/logo.png" alt="logo" />
      <ul>
        <li>
          <a href="/">Create Topic</a>
        </li>
        <li>
          <form role="search" method="get" action="/search">
            <input
              type="search"
              name="search-text"
              placeholder="Search..."
              aria-label="Search"
            />
            <button type="submit">Buscar</button>
          </form>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
