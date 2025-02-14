import React, { useState, useEffect, useCallback } from 'react';
import './Products.css';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import AddProductDialog from '../components/AddProductDialog';
import { getProducts, updateProduct, deleteProduct, addProduct } from '../services/productService';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  }, []);

  const handleUpdateProduct = async (id, updatedProduct) => {
    try {
      await updateProduct(id, updatedProduct);
      await fetchProducts();
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        await fetchProducts();
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  const handleBatchDelete = async () => {
    if (window.confirm('Are you sure you want to delete these products?')) {
      try {
        await Promise.all(selectedProducts.map(id => deleteProduct(id)));
        setSelectedProducts([]);
        await fetchProducts();
      } catch (error) {
        console.error('Failed to batch delete products:', error);
      }
    }
  };

  const handleCSVExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + products.map(product => `${product.name},${product.price},${product.stockQuantity}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link); // Clean up
  };

  const handleReportGeneration = () => {
    const reportHTML = generateReportHTML(products);
    const newWindow = window.open('', '_blank');
    newWindow.document.write(reportHTML);
    newWindow.document.close();
  };

  const generateReportHTML = (products) => {
    return `
      <html>
        <head>
          <title>Product Report</title>
          <style>
            body { font-family: 'Roboto', sans-serif; }
            h1 { color: #4a90e2; }
          </style>
        </head>
        <body>
          <h1>Product Report</h1>
          ${products.map(product => `<p>${product.name} - ${product.price} - Stock: ${product.stockQuantity}</p>`).join('')}
        </body>
      </html>
    `;
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const addedProduct = await addProduct(newProduct);
      setProducts([...products, addedProduct]);
      setShowAddDialog(false);
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (filterCategory === '' || product.category === filterCategory)
  );

  return (
    <div className="products-page">
            <section className="product-search">
        <h3>Search and Filter</h3>
        <div className="products-controls">
          <div className={`search-container ${isSearchOpen ? 'open' : ''}`}>
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              onBlur={() => setIsSearchOpen(false)}
              className="search-bar"
            />
            <button className="search-icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="filter-select-container">
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              className="filter-select"
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              {/* Add more categories as needed */}
            </select>
            <i className="fas fa-filter filter-icon"></i>
          </div>
          <button className="add-product-btn" onClick={() => setShowAddDialog(true)}>
            <span>Add Product</span>
            <i className="fas fa-plus-circle"></i>
          </button>
        </div>
      </section>

      <section className="product-list">
        <h3>Product Inventory</h3>
        <ProductList 
          products={filteredProducts} 
          onUpdate={handleUpdateProduct}
          onDelete={handleDeleteProduct}
          onSelect={setSelectedProducts}
          selectedProducts={selectedProducts}
        />
        {selectedProducts.length > 0 && (
          <button className="batch-action" onClick={handleBatchDelete}>
            Delete Selected ({selectedProducts.length})
          </button>
        )}
      </section>

      <section className="product-actions">
        <h3>Actions</h3>
        <div>
          <button className="export-btn" onClick={handleCSVExport}>Export to CSV</button>
          <button className="report-btn" onClick={handleReportGeneration}>Generate Report</button>
        </div>
      </section>

      {/* Modal for adding product */}
      {showAddDialog && 
        <AddProductDialog 
          onClose={() => setShowAddDialog(false)} 
          onAdd={handleAddProduct} 
        />
      }
    </div>
  );
};

export default Products;