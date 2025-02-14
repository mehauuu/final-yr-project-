import React from 'react';
import './ProductList.css';

const ProductList = ({ products, onUpdate, onDelete, onSelect, selectedProducts }) => {
  const toggleSelection = (id) => {
    if (selectedProducts.includes(id)) {
      onSelect(selectedProducts.filter(productId => productId !== id));
    } else {
      onSelect([...selectedProducts, id]);
    }
  };

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className={`product-item ${selectedProducts.includes(product.id) ? 'selected' : ''}`}>
          <input 
            type="checkbox" 
            checked={selectedProducts.includes(product.id)}
            onChange={() => toggleSelection(product.id)}
          />
          <div className="product-info">
            <h4>{product.name}</h4>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stockQuantity}</p>
          </div>
          <div className="product-actions">
            <button 
              className="product-action edit-btn" 
              onClick={() => {
                const updatedName = prompt('Enter new name:', product.name);
                if (updatedName !== null) {
                  onUpdate(product.id, { ...product, name: updatedName });
                }
              }}
            >
              Edit
            </button>
            <button 
              className="product-action delete-btn" 
              onClick={() => onDelete(product.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;