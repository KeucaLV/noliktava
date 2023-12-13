import React, { useState, useEffect } from "react";
import "../styles/prece.css";

function Preces() {
    const [precesData, setPrecesData] = useState([]);

    useEffect(() => {
        fetch("http://localhost/datubazes/noliktava/selectPreces.php")
            .then((response) => response.json())
            .then((data) => setPrecesData(data))
            .catch((error) => console.error("Error fetching data from API:", error));
    }, []);

    function handleDelete(id) {
        fetch(`http://localhost/datubazes/noliktava/deletePreces.php?id=${id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => {
                setPrecesData((prevData) => prevData.filter((prece) => prece.id !== id));
            })
            .catch((error) => console.error("Error deleting product:", error));
    }

    return (
        <>
            <div className="headerSub"></div>
            <div className="preces-main">
                {precesData.map((prece) => (
                    <div key={prece.id} className="flex-row">
                        <img src={prece.image} alt={`Product ${prece.id}`} />
                        <h2 className="dati">{prece.nosaukums}</h2>
                        <h2 className="dati">Daudzums: {prece.daudzums} gab.</h2>
                        <h2 className="dati">Cena: {prece.cena} €</h2>
                        <button
                            onClick={() => handleDelete(prece.id)}
                            className="edit-preces"
                        >
                            Rediģēt
                        </button>
                        <button
                            onClick={() => handleDelete(prece.id)}
                            className="delete-preces"
                        >
                            Dzēst
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Preces;
