import '../css/Header.css';




function Header() {
  return (
    <div className="header">
        <div className="logo">
            <img src={process.env.PUBLIC_URL + '/images/Logo.png'} alt="Logo" />
        </div>

        <div className="header-buttons">
            <button>Izvietot</button>
            <button>Preces</button>
            <button>Atskaites</button>
        </div>
    </div>
  );
}

export default Header;
