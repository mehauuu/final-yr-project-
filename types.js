// src/types.js

export const Product = {
  id: '', // Assuming string for simplicity, could be Guid in real scenarios
  name: '',
  description: '',
  price: 0,
  stockQuantity: 0,
  sku: '',
  createdAt: new Date()
};

export const Shipment = {
  id: '',
  trackingNumber: '',
  status: '', // In JavaScript, you would need to handle the status validation manually or use an enum-like approach
  origin: '',
  destination: '',
  expectedDeliveryDate: new Date(),
  createdAt: new Date()
};

export const User = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  createdAt: new Date()
};

export const AuthResponse = {
  token: '',
  user: User
};

