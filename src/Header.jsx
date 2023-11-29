import './Header.css';




function Header() {
  return (
    <div className="header">
        <div class="logo">
            <img src={process.env.PUBLIC_URL + '/images/Logo.png'} alt="Logo" />
        </div>

        <div class="header-buttons">
            <button>Izvietot</button>
            <button>Preces</button>
            <button>Atskaites</button>
        </div>
    </div>
  );
}

export default Header;
