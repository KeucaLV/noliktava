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
            imageUrl: "https://cdn.tet.lv/tetveikals-prd-images/product_popup_image/products/ld0005904386-1-620bb10cce689.jpg"
        },
        {
            id: 4,
            productName: "Alpine 23",
            quantity: 10,
            price: "30€",
            imageUrl: "https://www.arctic.de/media/a4/0e/3b/1610439307/alpine-23-co-g05.jpg"
        },
    ];

    return (
        <>
        <div className="headerSub"></div>
        <div className="preces-main">
            <h1>1. Plaukts</h1>
            <div className="plaukts" >
            {precesData.map((prece) => (
                <>
                    <div className="preces-box">
                        <img src={prece.imageUrl} alt={`Product ${prece.id}`} />
                        <h2 className="dati">{prece.productName}</h2>
                        <h2 className="dati">Daudzums: {prece.quantity} gab.</h2>
                        <h2 className="dati">Cena: {prece.price}</h2>
                    </div>
                    <div className="vertical-line"></div>
                </>
            ))}
        </div>
        </div>
        </>
    );
}

export default Preces;
