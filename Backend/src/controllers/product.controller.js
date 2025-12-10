// src/controllers/product.controller.js
// Controlador de CRUD de productos usando MongoDB

const Product = require('../models/product.model');
// Aquí se definen las funciones que responden a las rutas (endpoints)
module.exports = {
  // Obtiene todos los productos activos
  getAll: async (req, res) => {
    try {
      const productos = await Product.find({ activo: true });
      res.json(productos);
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  },

  // Obtiene un producto por ID
  getById: async (req, res) => {
    try {
      const id = req.params.id; // es el _id de Mongo

      const producto = await Product.findById(id);

      // Si no existe o está inactivo
      if (!producto || !producto.activo) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      res.json(producto);
    } catch (error) {
      console.error('Error al obtener producto por ID:', error);
      res.status(400).json({ error: 'ID inválido o error al buscar el producto' });
    }
  },

  // Crea un nuevo producto
  create: async (req, res) => {
    try {
      const { nombre, precio, cantidad, descripcion } = req.body;

      // Crea una instancia del modelo
      const nuevoProducto = new Product({
        nombre,
        precio,
        cantidad,
        descripcion
      });

      // Guarda en la base de datos
      const guardado = await nuevoProducto.save();

      res.status(201).json({
        mensaje: 'Producto creado',
        data: guardado
      });
    } catch (error) {
      console.error('Error al crear producto:', error);
      res.status(400).json({ error: 'Error al crear el producto' });
    }
  },

  // Actualiza un producto existente
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const { nombre, precio, cantidad, descripcion } = req.body;

      // Busca por ID y actualiza
      const actualizado = await Product.findByIdAndUpdate(
        id,
        { nombre, precio, cantidad, descripcion },
        { new: true } // devuelve el documento actualizado
      );

      if (!actualizado) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      res.json({
        mensaje: 'Producto actualizado',
        data: actualizado
      });
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      res.status(400).json({ error: 'Error al actualizar el producto' });
    }
  },

  // Elimina un producto (borrado suave)
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      // En lugar de borrarlo, marcamos activo = falsee
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
      console.error('Error al eliminar producto:', error);
      res.status(400).json({ error: 'Error al eliminar el producto' });
    }
  }
};
