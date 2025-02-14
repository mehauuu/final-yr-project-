import React, { useState } from 'react';
import './AddProductDialog.css';

const AddProductDialog = ({ onClose, onAdd }) => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    stockQuantity: '',
    sku: '',
    category: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(product);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <h2 className="modal-title">Add New Product</h2>
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input 
              id="name"
              type="text" 
              name="name" 
              value={product.name} 
              onChange={handleChange} 
              placeholder="Product Name" 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input 
              id="price"
              type="number" 
              name="price" 
              value={product.price} 
              onChange={handleChange} 
              placeholder="Price" 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="stockQuantity">Stock Quantity</label>
            <input 
              id="stockQuantity"
              type="number" 
              name="stockQuantity" 
              value={product.stockQuantity} 
              onChange={handleChange} 
              placeholder="Stock Quantity" 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="sku">SKU</label>
            <input 
              id="sku"
              type="text" 
              name="sku" 
              value={product.sku} 
              onChange={handleChange} 
              placeholder="SKU" 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select 
              id="category"
              name="category" 
              value={product.category} 
              onChange={handleChange} 
              required
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Food">Food</option>
              {/* Add more categories as needed */}
            </select>
          </div>
          <div className="modal-actions">
            <button type="submit" className="modal-btn modal-btn-primary">Add Product</button>
            <button type="button" onClick={onClose} className="modal-btn modal-btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductDialog;