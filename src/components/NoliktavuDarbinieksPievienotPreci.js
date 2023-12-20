import "../css/NoliktavuDarbinieksPievienot.css";
import React, { useState, useEffect } from 'react';


function NoliktavuDarbinieksPievienot() {
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
    const [categories, setCategories] = useState([]);
    const [kategorija, setKategorija] = useState('');
    const [kategorijaError, setKategorijaError] = useState('');
    

    useEffect(() => {
        fetch('http://localhost/noliktava_php/SelectKategorijas.php')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (!Array.isArray(data)) {
                    throw new Error('Data received is not in correct format');
                }
                setCategories(data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
                // Handle error: set error state, show error message, etc.
            });
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!nosaukums || !razotajs || !apraksts || !kategorija || !cena) {
            setNosaukumsError(!nosaukums ? 'Name cant be empty!' : '');
            setRazotajsError(!razotajs ? 'Brand cant be empty!' : '');
            setAprakstsError(!apraksts ? 'Description cant be empty!' : '');
            setKategorijaError(!kategorija ? 'Category cant be empty!' : '');
            setCenaError(!cena ? 'Price cant be empty!' : '');
            setImageError(!image ? 'Image link cant be empty!' : '');
            setDaudzumsError(!daudzums ? 'Quantity cant be empty!' : '');
            return;
        }

        let cleanData = {
            nosaukums,
            razotajs,
            apraksts,
            kategorija,
            cena,
            image,
            daudzums,
        };
        console.log('Sending request:', cleanData);

        try {
            let response = await fetch('http://localhost/noliktava_php/insertPreces.php', {
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
                    setKategorija('');
                    setCena('');
                    setImage('');
                    setDaudzums('');
                    // setSuccessMessage('');
                } else {
                    setSuccessMessage('Failed to insert data. Please try again.');
                }
            } else {
                const serverResponse = await response.text(); // Capture server response
                console.error('Invalid response format:', serverResponse); // Log the server response
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

    const handleKategorijaChange = (e) => {
        const value = e.target.value;
        setKategorija(value);
        setKategorijaError(!value ? 'Category cant be empty!' : ''); // Update error state based on value
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
            <div className="pievienotMain">
                <h1 className="pievienotMessage">Pievieno jaunu preci!</h1>
                <div className="pievienot-Preci-Box">
                    <form onSubmit={handleFormSubmit}>
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

                    <select
                            placeholder="Kategorija"
                            id="kategorija"
                            name="kategorija"
                            value={kategorija}
                            onChange={handleKategorijaChange}
                        >
                            <option>Kategorija</option>
                                {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.kategorija}
                                </option>
                                ))}
                        </select>
                        {kategorijaError && <p style={{ color: 'red' }}>{kategorijaError}</p>}

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
                    </form>
                </div>
            </div>
        </>
    );
}

export default NoliktavuDarbinieksPievienot;
