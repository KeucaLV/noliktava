import React, { useState, useEffect } from "react";
import "../styles/pievienot.css";

function Pasutit() {
    const [quantity, setQuantity] = useState(0);
    const [manufacturers, setManufacturers] = useState([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");

    useEffect(() => {
        fetchManufacturers();
    }, []);

    useEffect(() => {
        if (selectedManufacturer) {
            fetchProducts(selectedManufacturer);
        }
    }, [selectedManufacturer]);

    const fetchManufacturers = async () => {
        try {
            const response = await fetch("http://localhost/datubazes/noliktava/selectFirma.php");
            const data = await response.json();
            const uniqueManufacturers = [...new Set(data)];
            setManufacturers(uniqueManufacturers);
        } catch (error) {
            console.error("Error fetching manufacturers:", error);
        }
    };

    const fetchProducts = async (manufacturer) => {
        try {
            const response = await fetch(`http://localhost/datubazes/noliktava/selectNosaukums.php?manufacturer=${manufacturer}`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleManufacturerChange = (event) => {
        const selectedManufacturer = event.target.value;
        setSelectedManufacturer(selectedManufacturer);
        setSelectedProduct("");
    };

    const handleProductChange = (event) => {
        const selectedProduct = event.target.value;
        setSelectedProduct(selectedProduct);
    };

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

    const handleDownloadPdf = async () => {
        try {
            const now = new Date();
            const day = now.toLocaleString('en-US', { day: '2-digit' });
            const month = now.toLocaleString('en-US', { month: '2-digit' });
            const year = now.toLocaleString('en-US', { year: 'numeric' });
            const formattedTimestamp = `${month}/${day}/${year}`;

            const pdfName = `${formattedTimestamp}_Pasūtijumi.pdf`;

            const response = await fetch("http://localhost/datubazes/noliktava/fpdf/convert-pdf.php");
            const blob = await response.blob();

            const url = window.URL.createObjectURL(new Blob([blob]));

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", pdfName);

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading PDF:", error);
        }
    };

    return (
        <div>
            <div className="headerSub"></div>
            <div className="pievienotMain">
                <button className="pdfBtn" onClick={handleDownloadPdf}>
                    Download PDF
                </button>
                <h1 className="pievienotMessage">Pasūtīt preci!</h1>
                <div className="pasutit-Preci-Box">
                    <select onChange={handleManufacturerChange} value={selectedManufacturer}>
                        <option className="placeholder">
                            Ražotājs
                        </option>
                        {manufacturers.map((manufacturer) => (
                            <option key={manufacturer} value={manufacturer}>
                                {manufacturer}
                            </option>
                        ))}
                    </select>
                    <select onChange={handleProductChange} value={selectedProduct}>
                        <option className="placeholder" disabled>
                            Nosaukums
                        </option>
                        {products.map((product) => (
                            <option key={product} value={product}>
                                {product}
                            </option>
                        ))}
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
        </div>
    );
}

export default Pasutit;
