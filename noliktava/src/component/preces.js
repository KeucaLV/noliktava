import React, { useState, useEffect } from "react";
import "../styles/prece.css";
import EditProductModal from "./EditProductModal";

function Preces() {
    const [precesData, setPrecesData] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        fetch("http://localhost/datubazes/noliktava/selectPreces.php")
            .then((response) => response.json())
            .then((data) => setPrecesData(data))
            .catch((error) => console.error("Error fetching data from API:", error));
    }, []);

    const handleDelete = (id) => {
        fetch(`http://localhost/datubazes/noliktava/deletePreces.php?id=${id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then(() => {
                setPrecesData((prevData) => prevData.filter((prece) => prece.id !== id));
            })
            .catch((error) => console.error("Error deleting product:", error));
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setIsEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setEditingProduct(null);
        setIsEditModalOpen(false);
    };

    const handleProductUpdate = async (id, updatedProduct) => {
        try {
            const response = await fetch(`http://localhost/datubazes/noliktava/selectPreces.php?id=${id}`);
            const updatedProductData = await response.json();

            setPrecesData((prevData) => {
                return prevData.map((prece) => (prece.id === id ? updatedProductData : prece));
            });

            handleEditModalClose();

        } catch (error) {
            console.error("Error fetching updated product data:", error);
        }
    };
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
                        <button onClick={() => handleEdit(prece)} className="edit-preces">
                            Rediģēt
                        </button>
                        <button onClick={() => handleDelete(prece.id)} className="delete-preces">
                            Dzēst
                        </button>
                    </div>
                ))}
            </div>

            {isEditModalOpen && (
                <EditProductModal
                    id={editingProduct.id}
                    product={editingProduct}
                    onClose={handleEditModalClose}
                    onUpdate={handleProductUpdate}
                />
            )}
        </>
    );
}

export default Preces;
