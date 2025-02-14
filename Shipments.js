import React, { useState, useEffect, useCallback } from 'react';
import './Shipments.css';
import ShipmentList from '../components/ShipmentList';
import AddShipmentDialog from '../components/AddShipmentDialog';
import { getShipments, addShipment, updateShipment, deleteShipment } from '../services/shipmentService';

const Shipments = () => {
  const [shipments, setShipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = useCallback(async () => {
    try {
      const fetchedShipments = await getShipments();
      setShipments(fetchedShipments);
    } catch (error) {
      console.error('Failed to fetch shipments:', error);
    }
  }, []);

  const handleAddShipment = async (newShipment) => {
    try {
      const addedShipment = await addShipment(newShipment);
      setShipments([...shipments, addedShipment]);
      setShowAddDialog(false);
    } catch (error) {
      console.error('Failed to add shipment:', error);
    }
  };

  const handleUpdateShipment = async (id, updatedShipment) => {
    try {
      await updateShipment(id, updatedShipment);
      await fetchShipments();
    } catch (error) {
      console.error('Failed to update shipment:', error);
    }
  };

  const handleDeleteShipment = async (id) => {
    if (window.confirm('Are you sure you want to delete this shipment?')) {
      try {
        await deleteShipment(id);
        await fetchShipments();
      } catch (error) {
        console.error('Failed to delete shipment:', error);
      }
    }
  };

  const handleCSVExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + shipments.map(shipment => `${shipment.trackingNumber},${shipment.status},${shipment.origin},${shipment.destination}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "shipments.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReportGeneration = () => {
    const reportHTML = generateReportHTML(shipments);
    const newWindow = window.open('', '_blank');
    newWindow.document.write(reportHTML);
    newWindow.document.close();
  };

  const generateReportHTML = (shipments) => {
    return `
      <html>
        <head>
          <title>Shipment Report</title>
          <style>
            body { font-family: 'Roboto', sans-serif; }
            h1 { color: #4a90e2; }
          </style>
        </head>
        <body>
          <h1>Shipment Report</h1>
          ${shipments.map(shipment => `<p>Tracking Number: ${shipment.trackingNumber} - Status: ${shipment.status} - From: ${shipment.origin} to: ${shipment.destination}</p>`).join('')}
        </body>
      </html>
    `;
  };

  const filteredShipments = shipments.filter(shipment => 
    shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (filterStatus === '' || shipment.status === filterStatus)
  );

  return (
    <div className="shipments-page">
      <section className="shipment-search">
        <h3>Search and Filter</h3>
        <div className="shipments-controls">
          <input 
            type="text" 
            placeholder="Search by tracking number..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="">All Statuses</option>
            <option value="PendingPickup">Pending Pickup</option>
            <option value="EnRouteToDestination">In Transit</option>
            <option value="DeliveredSuccessfully">Delivered</option>
          </select>
          <button className="add-shipment-btn" onClick={() => setShowAddDialog(true)}>
            <span>Add Shipment</span>
            <i className="fas fa-plus-circle"></i>
          </button>
        </div>
      </section>

      <section className="shipment-list">
        <h3>Shipment Tracker</h3>
        <ShipmentList 
          shipments={filteredShipments} 
          onUpdate={handleUpdateShipment}
          onDelete={handleDeleteShipment}
        />
      </section>

      <section className="shipment-actions">
        <h3>Actions</h3>
        <div>
          <button className="export-btn" onClick={handleCSVExport}>Export to CSV</button>
          <button className="report-btn" onClick={handleReportGeneration}>Generate Report</button>
        </div>
      </section>

      {showAddDialog && 
        <AddShipmentDialog 
          onClose={() => setShowAddDialog(false)} 
          onAdd={handleAddShipment} 
        />
      }
    </div>
  );
};

export default Shipments;