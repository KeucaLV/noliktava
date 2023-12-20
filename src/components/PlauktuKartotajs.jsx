import '../css/PlauktuKartotajs.css';

function PlauktuKartotajs() {
  return (
    <div className="PlauktuKartotajs">
      <div className="Text">
        <h1>Sveiks, Plauktu Kārtotāj!</h1>
      </div>
        <div className="PlauktuKartotajsBG">
          <div className="darkOverlay"></div>
          <img src={process.env.PUBLIC_URL + '/images/Plauktu-kartotajs-bg.png'} alt="BG" />
        </div>
    </div>
  );
}

export default PlauktuKartotajs;
