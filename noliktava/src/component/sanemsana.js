import React, { useState, useEffect } from "react";
import "../styles/prece.css";

function Sanemsana() {
    const [precesData, setPrecesData] = useState([]);

    useEffect(() => {
        fetch("http://localhost/datubazes/noliktava/sanemsana.php")
            .then((response) => response.json())
            .then((data) => setPrecesData(data))
            .catch((error) => console.error("Error fetching data from API:", error));
    }, []);

    const handleReceivedClick = (preceId) => {
        fetch("http://localhost/datubazes/noliktava/sanemsana.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `preceId=${preceId}`,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Response from server:", data); // Log the response for debugging

                if (data.success) {
                    setPrecesData((prevData) =>
                        prevData.map((prece) =>
                            prece.id === preceId ? { ...prece, status: "Received" } : prece
                        )
                    );
                } else {
                    console.error("Error updating status:", data.error || "Unknown error");
                }
            })
            .catch((error) => console.error("Error updating status:", error));
    };


    return (
        <>
            <div className="headerSub"></div>
            <div className="pieveinotMain">
                {precesData.map((prece) => (
                    <div key={prece.id} className="flex-row">
                        <h2 className="dati">{prece.nosaukums}</h2>
                        <h2 className="dati">Quantity: {prece.daudzums} gab.</h2>
                        <h2 className="dati">Date Ordered: {prece.dateOrdered} </h2>
                        <h2 className="dati">Status: {prece.status} </h2>
                        <button onClick={() => handleReceivedClick(prece.id)}>Received</button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Sanemsana;
