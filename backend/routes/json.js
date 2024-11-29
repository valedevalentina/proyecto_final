const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();

// Ruta base de la carpeta json
const jsonBasePath = path.join(__dirname, '../json'); // Ajustado para que use la ruta correcta dentro de backend

/* Endpoint para devolver el contenido de la carpeta `json`
Devuelve una lista de todos los archivos y carpetas dentro del directorio `json`. */
router.get('/json', (req, res) => {
  fs.readdir(jsonBasePath, { withFileTypes: true }, (err, files) => {
    if (err) {
      return res
        .status(500)
        .json({ error: 'Error al leer el directorio json' });
    }

    // Devuelve un array con los nombres de todos los archivos y carpetas
    const content = files.map((file) => file.name);
    res.json(content);
  });
});

/* Endpoint para devolver solo las carpetas dentro de `json`
Filtra y devuelve únicamente los directorios dentro de la carpeta `json`*/

router.get('/json/:folder', (req, res) => {
  const { folder } = req.params;
  const folderPath = path.join(jsonBasePath, folder);

  // Verificar que la carpeta exista
  fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      return res.status(404).json({ error: 'Carpeta no encontrada' });
    }

    // Listar los archivos JSON dentro de la carpeta
    const jsonFiles = files
      .filter((file) => file.isFile() && file.name.endsWith('.json'))
      .map((file) => file.name);

    res.json(jsonFiles);
  });
});

/* Endpoint para devolver el contenido de un archivo JSON dentro de una carpeta específica
 Permite acceder a un archivo JSON en el formato `/json/:folder/:file`. */
router.get('/json/:folder/:file', (req, res) => {
  const { folder, file } = req.params;

  // Construimos la ruta hacia el archivo JSON
  const filePath = path.join(jsonBasePath, folder, `${file}.json`);

  // Verifica si el archivo existe y lo envía al cliente
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ error: 'Archivo no encontrado' });
    }
  });
});

module.exports = router;
