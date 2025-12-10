// src/models/product.model.js
// Modelo de producto usando Mongoose

const mongoose = require('mongoose');

// Define la estructura de un producto en la base de datos
const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  descripcion: {
    type: String,
    default: ''
  },
  activo: {
    type: Boolean,
    default: true // para borrado suave
  }
}, {
  timestamps: true // createdAt y updatedAt
});

// Crea el modelo basado en el esquema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
