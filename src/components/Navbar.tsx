import "../Styles/Navbar.css";

function NavBar() {
  return (
    <nav className="Navbar">
      <img className="logo" src="../public/IconWwW.svg" alt="logo" />
      <ul>
        <li>
          <a href="/">Create Topic</a>
        </li>

        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
