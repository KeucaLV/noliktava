import "../styles/pievienot.css";
import React, { useState, useEffect } from 'react';
function Pievienot() {

    const [nosaukums, setNosaukums] = useState('');
    const [razotajs, setRazotajs] = useState('');
    const [apraksts, setApraksts] = useState('');
    const [cena, setCena] = useState('');
    const [nosaukumsError, setNosaukumsError] = useState('');
    const [razotajsError, setRazotajsError] = useState('');
    const [aprakstsError, setAprakstsError] = useState('');
    const [cenaError, setCenaError] = useState('');
    const handleFormSubmit = async () => {
        if (!nosaukums || !razotajs || !apraksts || !cena) {
            setNosaukumsError(!nosaukums ? 'Name cant be empty!' : '');
            setRazotajsError(!razotajs ? 'Brand cant be empty!' : '');
            setAprakstsError(!apraksts ? 'Description cant be empty!' : '');
            setCenaError(!cena ? 'Price cant be empty!' : '');
            return;
        }

        let cleanData = {
            nosaukums,
            razotajs,
            apraksts,
            cena,
        };
        console.log('Sending request:', cleanData);

        try {
            let response = await fetch('http://localhost/datubazes/noliktava/insertPreces.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cleanData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const responseData = await response.json();
                console.log(responseData);
            } else {
                console.error('Invalid response format:', await response.text());
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <>
            <div className="headerSub">

            </div>
            <div className="pievienotMain">
                <h1 className="pievienotMessage">Pievieno jaunu preci!</h1>
                <div className="pievienot-Preci-Box">
                    <input placeholder="Nosaukums"
                           type="text"
                           id="Nosaukums"
                           name="Nosaukums"
                           value={nosaukums}
                           onChange={(e) => setNosaukums(e.target.value)}
                    />
                    {nosaukumsError && <p style={{ color: 'red' }}>{nosaukumsError}</p>}
                    <input placeholder="Ražotājs"
                           type="text"
                           id="razotajs"
                           name="razotajs"
                           value={razotajs}
                           onChange={(e) => setRazotajs(e.target.value)}
                    />
                    {razotajsError && <p style={{ color: 'red' }}>{razotajsError}</p>}
                    <textarea placeholder="Tehniskais Apraksts"
                            id="apraksts"
                            name="apraksts"
                            value={apraksts}
                            onChange={(e ) => setApraksts(e.target.value)}>
                    </textarea>
                    {aprakstsError && <p style={{ color: 'red' }}>{aprakstsError}</p>}
                    <input type="number"
                           placeholder="Cena €"
                           id="cena"
                           name="cena"
                           value={cena}
                           onChange={(e) => setCena(e.target.value)}
                    />
                    {cenaError && <p style={{ color: 'red' }}>{cenaError}</p>}
                    <button className="pievienot-Preci-Btn" onClick={handleFormSubmit}>Pievienot</button>
                </div>
            </div>
        </>
    );
}

export default Pievienot;