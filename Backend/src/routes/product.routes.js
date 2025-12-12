// src/routes/product.routes.js
// Rutas del CRUD de productos

const express = require('express');
const controller = require('../controllers/product.controller');

const router = express.Router();

// Lista todos los productos
router.get('/', controller.getAll);

// Obtiene un producto por ID
router.get('/:id', controller.getById);

// Crea un nuevo producto
router.post('/', controller.create);

// Actualiza un producto (PUT = reemplazo completo)
router.put('/:id', controller.update);

// Actualiza parcialmente un producto (PATCH)
router.patch('/:id', controller.update);

// Borrado suave (soft delete) del producto
router.delete('/:id', controller.eliminar);

module.exports = router