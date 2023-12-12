import React from "react";
import "../styles/prece.css";
function Preces() {
    const precesData = [
        {
            id: 1,
            productName: "RTX 4070",
            quantity: 6,
            price: "700€",
            imageUrl: "https://webshop.asus.com/media/10/dd/8f/1689847147/62713793918fbf318eddc2c2e52fd857.png"
        },
        {
            id: 2,
            productName: "RTX 3060",
            quantity: 3,
            price: "450€",
            imageUrl: "https://www.dateks.lv/images/pic/2400/2400/710/1350.jpg"
        },
        {
            id: 3,
            productName: "ASUS ROG Ryujin",
            quantity: 2,
            price: "300€",
            imageUrl: "https://www.dateks.lv/images/pic/2400/2400/352/1110.jpg"
        },
        {
            id: 4,
            productName: "Alpine 23",
            quantity: 10,
            price: "30€",
            imageUrl: "https://www.arctic.de/media/d4/c0/ee/1607343612/alpine-23-g00.png"
        },
        {
            id: 5,
            productName: "Radeon RX6800",
            quantity: 3,
            price: "435€",
            imageUrl: "https://static.gigabyte.com/StaticFile/Image/Global/1c24cc7f50ab47464a78ee4a43ac2a78/Product/26401/Png"
        },
    ];

    return (
        <>
        <div className="headerSub"></div>
        <div className="preces-main">

            {precesData.map((prece) => (
                <>
                    <div className="flex-row">
                        <img src={prece.imageUrl} alt={`Product ${prece.id}`} />
                        <h2 className="dati">{prece.productName}</h2>
                        <h2 className="dati">Daudzums: {prece.quantity} gab.</h2>
                        <h2 className="dati">Cena: {prece.price}</h2>
                        <button className="edit-preces">Rediģēt</button>
                        <button className="delete-preces">Dzēst</button>
                    </div>

                </>
            ))}
        </div>
        </>
    );
}

export default Preces;
