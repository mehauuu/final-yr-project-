import React, { useState } from 'react';
import './AddShipmentDialog.css';

const AddShipmentDialog = ({ onClose, onAdd }) => {
  const [shipment, setShipment] = useState({
    trackingNumber: '',
    status: 'PendingPickup',
    origin: '',
    destination: '',
    expectedDeliveryDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(shipment);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (e) => {
    setShipment(prev => ({
      ...prev,
      expectedDeliveryDate: e.target.value
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
        <h2 className="modal-title">Add New Shipment</h2>
        <div className="form-group">
          <label htmlFor="trackingNumber">Tracking Number</label>
          <input 
            id="trackingNumber"
            type="text" 
            name="trackingNumber" 
            value={shipment.trackingNumber} 
            onChange={handleChange} 
            placeholder="Tracking Number" 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select 
            id="status"
            name="status" 
            value={shipment.status} 
            onChange={handleChange} 
            required
          >
            <option value="PendingPickup">Pending Pickup</option>
            <option value="EnRouteToDestination">In Transit</option>
            <option value="DeliveredSuccessfully">Delivered</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="origin">Origin</label>
          <input 
            id="origin"
            type="text" 
            name="origin" 
            value={shipment.origin} 
            onChange={handleChange} 
            placeholder="Origin" 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="destination">Destination</label>
          <input 
            id="destination"
            type="text" 
            name="destination" 
            value={shipment.destination} 
            onChange={handleChange} 
            placeholder="Destination" 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="expectedDeliveryDate">Expected Delivery Date</label>
          <input 
            id="expectedDeliveryDate"
            type="date" 
            name="expectedDeliveryDate" 
            value={shipment.expectedDeliveryDate} 
            onChange={handleDateChange} 
            required 
          />
        </div>
        <div className="modal-actions">
          <button type="submit" className="modal-btn modal-btn-primary">Add Shipment</button>
          <button type="button" onClick={onClose} className="modal-btn modal-btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  </div>
);
};

export default AddShipmentDialog;