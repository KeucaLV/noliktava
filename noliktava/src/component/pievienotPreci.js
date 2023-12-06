import "../styles/pievienot.css";

function Pievienot() {
    return (
        <>
            <div className="headerSub">

            </div>
            <div className="pievienotMain">
                <h1 className="pievienotMessage">Pievieno jaunu preci!</h1>
                <div className="pievienot-Preci-Box">
                    <input placeholder="Nosaukums"/>
                    <input placeholder="Ražotājs"/>
                    <textarea placeholder="Tehniskais Apraksts"></textarea>
                    <input type="number" placeholder="Cena €"/>
                    <button className="pievienot-Preci-Btn">Pievienot</button>
                </div>
            </div>
        </>
    );
}

export default Pievienot;