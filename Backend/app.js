const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Conexión a MongoDB
require('./src/config/database');

app.use(cors());

// Middleware
app.use(express.json());

// Rutas
const productRoutes = require('./src/routes/product.routes');
app.use('/api/productos', productRoutes);

// Ruta de prueba
// app.get('/', (req, res) => {
//   res.send('Funcionando');
// });

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
