import React, { useState } from "react";
import "../styles/pievienot.css";

function Pasutit() {
    const [quantity, setQuantity] = useState(0);

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const calculateDeliveryDays = () => {
        const quantityAsNumber = parseInt(quantity, 10);

        if (isNaN(quantityAsNumber) || quantityAsNumber === 0) {
            return "N/A";
        } else {
            return quantityAsNumber + 1;
        }
    };


    return (
        <>
            <div className="headerSub"></div>
            <div className="pievienotMain">
                <h1 className="pievienotMessage">Pasūtīt preci!</h1>
                <div className="pasutit-Preci-Box">
                    <select>
                        <option className="placeholder" disabled selected>
                            Ražotājs
                        </option>
                        <option>GeForce</option>
                        <option>AMD</option>
                        <option>Intel</option>
                    </select>
                    <select>
                        <option className="placeholder" disabled selected>
                            Nosaukums
                        </option>
                        <option>RTX 3060</option>
                        <option>RTX 4070</option>
                        <option>RTX 3050</option>
                    </select>
                    <input
                        placeholder="Daudzums"
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                    <h4 className="piegade">
                        Pasūtijums tiks piegādāts pēc {calculateDeliveryDays()} Dienām
                    </h4>
                    <button className="pievienot-Preci-Btn">Pasūtīt</button>
                </div>
            </div>
        </>
    );
}

export default Pasutit;
