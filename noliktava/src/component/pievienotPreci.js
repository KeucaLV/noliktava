import "../styles/pievienot.css";
import React, { useState } from 'react';

function Pievienot() {
    const [nosaukums, setNosaukums] = useState('');
    const [razotajs, setRazotajs] = useState('');
    const [apraksts, setApraksts] = useState('');
    const [cena, setCena] = useState('');
    const [image, setImage] = useState('');
    const [daudzums, setDaudzums] = useState('');
    const [nosaukumsError, setNosaukumsError] = useState('');
    const [razotajsError, setRazotajsError] = useState('');
    const [aprakstsError, setAprakstsError] = useState('');
    const [cenaError, setCenaError] = useState('');
    const [imageError, setImageError] = useState('');
    const [daudzumsError, setDaudzumsError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleFormSubmit = async () => {
        if (!nosaukums || !razotajs || !apraksts || !cena) {
            setNosaukumsError(!nosaukums ? 'Name cant be empty!' : '');
            setRazotajsError(!razotajs ? 'Brand cant be empty!' : '');
            setAprakstsError(!apraksts ? 'Description cant be empty!' : '');
            setCenaError(!cena ? 'Price cant be empty!' : '');
            setImageError(!image ? 'Image link cant be empty!' : '');
            setDaudzumsError(!daudzums ? 'Quantity cant be empty!' : '');
            return;
        }

        let cleanData = {
            nosaukums,
            razotajs,
            apraksts,
            cena,
            image,
            daudzums,
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
                if (responseData.success) {
                    setSuccessMessage('Data inserted successfully!');
                    setNosaukums('');
                    setRazotajs('');
                    setApraksts('');
                    setCena('');
                    setImage('');
                    setDaudzums('');
                    // setSuccessMessage('');
                } else {
                    setSuccessMessage('Failed to insert data. Please try again.');
                }
            } else {
                console.error('Invalid response format:', await response.text());
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const validateText = (text) => {
        return text.length >= 3 && text.length <= 200;
    };

    const handleNosaukumsChange = (e) => {
        const value = e.target.value;
        setNosaukums(value);
        setNosaukumsError(!validateText(value) ? 'Name must be between 3 and 200 characters!' : '');
    };

    const handleRazotajsChange = (e) => {
        const value = e.target.value;
        setRazotajs(value);
        setRazotajsError(!validateText(value) ? 'Brand must be between 3 and 200 characters!' : '');
    };

    const handleAprakstsChange = (e) => {
        const value = e.target.value;
        setApraksts(value);
        setAprakstsError(!validateText(value) ? 'Description must be between 3 and 200 characters!' : '');
    };

    const handleCenaChange = (e) => {
        const value = e.target.value;
        setCena(value);
        setCenaError(!value ? 'Price cant be empty!' : '');
    };
    const handleImageChange = (e) => {
        const value = e.target.value;
        setImage(value);
        setImageError(!validateText(value) ? 'Image link must be between 3 and 200 characters!' : '');
    };

    const handleDaudzumsChange = (e) => {
        const value = e.target.value;
        setDaudzums(value);
        setDaudzumsError(!daudzums ? 'Quantity cant be empty' : '');
    };

    return (
        <>
            <div className="headerSub"></div>
            <div className="pievienotMain">
                <h1 className="pievienotMessage">Pievieno jaunu preci!</h1>
                <div className="pievienot-Preci-Box">
                    <input
                        placeholder="Name"
                        type="text"
                        id="Nosaukums"
                        name="Nosaukums"
                        value={nosaukums}
                        onChange={handleNosaukumsChange}
                    />
                    {nosaukumsError && <p style={{ color: 'red' }}>{nosaukumsError}</p>}
                    <input
                        placeholder="Brand"
                        type="text"
                        id="razotajs"
                        name="razotajs"
                        value={razotajs}
                        onChange={handleRazotajsChange}
                    />
                    {razotajsError && <p style={{ color: 'red' }}>{razotajsError}</p>}
                    <textarea
                        placeholder="Description"
                        id="apraksts"
                        name="apraksts"
                        value={apraksts}
                        onChange={handleAprakstsChange}
                    ></textarea>
                    {aprakstsError && <p style={{ color: 'red' }}>{aprakstsError}</p>}
                    <input
                        type="number"
                        placeholder="Price €"
                        id="cena"
                        name="cena"
                        value={cena}
                        onChange={handleCenaChange}
                    />
                    {cenaError && <p style={{ color: 'red' }}>{cenaError}</p>}
                    <input
                        placeholder="Image Link"
                        type="text"
                        id="image"
                        name="image"
                        value={image}
                        onChange={handleImageChange}
                    />
                    {imageError && <p style={{ color: 'red' }}>{imageError}</p>}
                    <input
                        placeholder="Quantity"
                        type="number"
                        id="daudzums"
                        name="daudzums"
                        value={daudzums}
                        onChange={handleDaudzumsChange}
                    />
                    {daudzumsError && <p style={{ color: 'red' }}>{daudzumsError}</p>}
                    <button className="pievienot-Preci-Btn" onClick={handleFormSubmit}>
                        Pievienot
                    </button>
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                </div>
            </div>
        </>
    );
}

export default Pievienot;
