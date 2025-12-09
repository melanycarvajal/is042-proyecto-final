// Rutas del CRUD de productos
// Conecta los URLs con las funciones del controlador

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller');

// Obtiene todos los productos
router.get('/', controller.getAll);

// Obtiene un producto por ID
router.get('/:id', controller.getById);

// Crea un nuevo producto
router.post('/', controller.create);

// Actualiza un producto ya existente
router.put('/:id', controller.update);

// Elimina un producto por ID
router.delete('/:id', controller.delete);

module.exports = router;
