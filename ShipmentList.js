import React from 'react';
import './ShipmentList.css';

const ShipmentList = ({ shipments, onUpdate, onDelete }) => {
  const handleStatusChange = (shipmentId, status) => {
    onUpdate(shipmentId, { status });
  };

  return (
    <div className="shipment-list">
      {shipments.map(shipment => (
        <div key={shipment.id} className="shipment-item">
          <div className="shipment-info">
            <h4>Tracking Number: {shipment.trackingNumber}</h4>
            <p>Status: 
              <select 
                value={shipment.status} 
                onChange={(e) => handleStatusChange(shipment.id, e.target.value)}
                className="status-select"
              >
                <option value="PendingPickup">Pending Pickup</option>
                <option value="EnRouteToDestination">In Transit</option>
                <option value="DeliveredSuccessfully">Delivered</option>
              </select>
            </p>
            <p>From: {shipment.origin}</p>
            <p>To: {shipment.destination}</p>
            <p>Expected Delivery: {new Date(shipment.expectedDeliveryDate).toLocaleDateString()}</p>
          </div>
          <div className="shipment-actions">
            <button 
              className="shipment-action delete-btn" 
              onClick={() => onDelete(shipment.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShipmentList;