const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000; // Cambia el puerto si es necesario

app.use(cors());
app.use(express.json());

// Rutas para devolver los archivos JSON
app.get('/json/:file', (req, res) => {
  const fileName = req.params.file;
  const filePath = path.join(__dirname, '..', 'json', `${fileName}.json`);

  // Verifica que el archivo exista y envíalo
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ error: 'Archivo no encontrado' });
    }
  });
});

// Servidor en ejecución
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
