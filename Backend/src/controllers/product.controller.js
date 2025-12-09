// Controlador de CRUD de productos
// Aqui contiene todas las funcones que responden a las rutas (los endpointss)
const Product = require('../models/product.model');
let products = require('../models/product.store');

// Obtiene los productos
module.exports = {
  getAll: (req, res) => {
    res.json(products);
  },

// Obtiene los productos pero por ID
  getById: (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (!product) return res.status(404).json({ error: "Lo sentimos, producto no encontradoo" });
    res.json(product);
  },

// Crea un nuevo producto (pendiente)
  create: (req, res) => {
   
  },

// Actualiza un producto existente (pendiente)
  update: (req, res) => {
   
  },

  // Elimina un producto por ID (pendiente)
  delete: (req, res) => {
   
  }
};
