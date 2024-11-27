const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

const authRoutes = require('./routes/auth');
const jsonRoutes = require('./routes/json');
const cartRoutes = require('./routes/cart');

app.use('/api', authRoutes); // Rutas de autenticación
app.use('/api', jsonRoutes); // Rutas de utilidades de json
app.use('/api', cartRoutes); // Rutas del cart

app.use(cors());
app.use(express.json());

// Servidor en ejecución
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
