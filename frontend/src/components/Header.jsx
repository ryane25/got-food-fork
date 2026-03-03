import "../styles/Header.css";
import logo1 from "../assets/vt_icon.png";
import logo2 from "../assets/hokie_bird.png";

function Header() {
  return (
    <header className="header">
      <div className="header-side">
        <img src={logo1} alt="Logo" className="header-logo" />
      </div>

      <h1 className="header-title">
        VT Grad School Food Resources for the Northern Virginia Area
      </h1>

      <div className="header-side">
        <img src={logo2} alt="Logo" className="header-logo" />
      </div>
    </header>
  );
}

export default Header;
