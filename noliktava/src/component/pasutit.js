import React, { useState, useEffect } from "react";
import "../styles/pievienot.css";

function Pasutit() {
    const [quantity, setQuantity] = useState(0);
    const [manufacturers, setManufacturers] = useState([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [manufacturerError, setManufacturerError] = useState("");
    const [productError, setProductError] = useState("");
    const [quantityError, setQuantityError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

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
        setManufacturerError("");
    };

    const handleProductChange = (event) => {
        const selectedProduct = event.target.value;
        setSelectedProduct(selectedProduct);
        setProductError("");
    };

    const handleQuantityChange = (event) => {
        const value = event.target.value;
        setQuantity(value);
        setQuantityError("");
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

    const handleOrderSubmit = async () => {
        try {
            setManufacturerError("");
            setProductError("");
            setQuantityError("");

            if (!selectedManufacturer) {
                setManufacturerError("Manufacturer is required");
                return;
            }

            if (quantity <= 0) {
                setQuantityError("Quantity must be greater than 0");
                return;
            }

            const now = new Date();
            const day = now.toLocaleString("en-US", { day: "2-digit" });
            const month = now.toLocaleString("en-US", { month: "2-digit" });
            const year = now.toLocaleString("en-US", { year: "numeric" });
            const formattedDate = `${day}.${month}.${year}`;

            const orderData = {
                razotajs: selectedManufacturer,
                nosaukums: selectedProduct,
                daudzums: quantity,
                dateOrdered: formattedDate,
            };

            const response = await fetch("http://localhost/datubazes/noliktava/pasutitPreces.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                setSuccessMessage("Order submitted successfully!");
            } else {
                console.error("Failed to submit order:", response.statusText);
                alert("Failed to submit order. Please try again later.");
            }
        } catch (error) {
            console.error("Error submitting order:", error);
            alert("An unexpected error occurred. Please try again later.");
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
                        <option className="placeholder">Ražotājs</option>
                        {manufacturers.map((manufacturer) => (
                            <option key={manufacturer} value={manufacturer}>
                                {manufacturer}
                            </option>
                        ))}
                    </select>
                    <span style={{ color: 'red' }}>{manufacturerError}</span>
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
                    <span style={{ color: 'red' }}>{productError}</span>
                    <input
                        placeholder="Daudzums"
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                    <span style={{ color: 'red' }}>{quantityError}</span>
                    <h4 className="piegade">
                        Pasūtijums tiks piegādāts pēc {calculateDeliveryDays()} Dienām
                    </h4>
                    <button className="pievienot-Preci-Btn" onClick={handleOrderSubmit}>
                        Pasūtīt
                    </button>
                    {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
                </div>
            </div>
        </div>
    );
}

export default Pasutit;
