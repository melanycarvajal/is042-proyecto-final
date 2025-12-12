// src/controllers/product.controller.js
// Controlador de CRUD de productos

const Product = require('../models/product.model');


// Obtener todos los productos (solo activos)
const getAll = async (req, res) => {
  try {
    // Solo productos que NO han sido borrados (borrado suave)
    const productos = await Product.find({ activo: true });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

// Obtener producto por ID (solo si está activo)
const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await Product.findOne({ _id: id, activo: true });

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el producto' });
  }
};

// Crear un nuevo producto
const create = async (req, res) => {
  try {
    const { nombre, precio, cantidad, descripcion } = req.body;

    const nuevoProducto = new Product({
      nombre,
      precio,
      cantidad,
      descripcion
      // activo se va en true por defecto
    });

    const guardado = await nuevoProducto.save();

    res.status(201).json({
      mensaje: 'Producto creado',
      data: guardado
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

// Actualizar producto completo (PUT)
const update = async (req, res) => {
  try {
    const { id } = req.params;

    const actualizado = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!actualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({
      mensaje: 'Producto actualizado (PUT)',
      data: actualizado
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

// Actualización parcial (PATCH)
const partialUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    // Igual que PUT pero semánticamente PATCH = actualización parcial
    const actualizado = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!actualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({
      mensaje: 'Producto actualizado (PATCH)',
      data: actualizado
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto (PATCH)' });
  }
};

// Eliminar producto (BORRADO SUAVE)
const eliminar = async (req, res) => {
  try {
    const { id } = req.params;

    // En vez de borrar de la BD, marcamos activo = false
    const eliminado = await Product.findByIdAndUpdate(
      id,
      { activo: false },
      { new: true }
    );

    if (!eliminado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({
      mensaje: 'Producto eliminado correctamente',
      data: eliminado
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

// Exporta las funciones del controlador
module.exports = {
  getAll,
  getById,
  create,
  update,
  partialUpdate,
  eliminar
};
