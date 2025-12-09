const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para permitir JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor del proyecto IS042 funcionando correctamente');
});

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
