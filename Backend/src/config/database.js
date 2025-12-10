const mongoose = require('mongoose');

// URL de conexión a MongoDB Local
const MONGO_URI = 'mongodb://127.0.0.1:27017/crud_productos';

// Conexión a MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((error) => {
    console.error('Error:', error);
  });

module.exports = mongoose;
