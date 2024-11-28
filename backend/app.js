const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

const authRoutes = require('./routes/auth');
const jsonRoutes = require('./routes/json');
const cartRoutes = require('./routes/cart');

app.use('/api', authRoutes); // Rutas de autenticación
app.use('/api', jsonRoutes); // Rutas de utilidades de json
app.use('/api', cartRoutes); // Rutas del cart

app.use(express.json());

// Servidor en ejecución
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
