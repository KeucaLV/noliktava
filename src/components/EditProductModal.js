import React, { useState } from "react";
import "../css/editProductModal.css"; // Import your modal styles

function EditProductModal({ id, product, onClose, onUpdate }) {
    const [updatedProduct, setUpdatedProduct] = useState({
        id: product.id,
        nosaukums: product.nosaukums,
        daudzums: product.daudzums,
        cena: product.cena,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost/noliktava_php/updatePreces.php?id=${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });

            if (response.ok) {
                // Product updated successfully, you might want to handle this accordingly
                onUpdate(id, updatedProduct);
                onClose(); // Close the modal
            } else {
                console.error("Failed to update product:", response.statusText);
                // Handle the error, you might want to display an error message
            }
        } catch (error) {
            console.error("Error updating product:", error);
            // Handle the error, you might want to display an error message
        }
    };

    return (
        <div className="edit-modal">
            <div className="edit-modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Edit Product</h2>
                <form onSubmit={handleSubmit}>
                    <label>Nosaukums:</label>
                    <input type="text" name="nosaukums" value={updatedProduct.nosaukums} onChange={handleChange} required />
                    <label>Daudzums:</label>
                    <input type="text" name="daudzums" value={updatedProduct.daudzums} onChange={handleChange} required />
                    <label>Cena:</label>
                    <input type="text" name="cena" value={updatedProduct.cena} onChange={handleChange} required />
                    <button type="submit">Update Product</button>
                </form>
            </div>
        </div>
    );
}

export default EditProductModal;
