const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Importar la librería jsonwebtoken
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Clave secreta para firmar los tokens (en producción, usar variables de entorno)
const SECRET_KEY = 'mi_secreto_super_seguro';

// Datos de ejemplo (reemplazar con una base de datos real en producción)
const USERS = [
    { username: 'user1@example.com', password: 'password123' },
    { username: 'user2@example.com', password: 'password456' },
];

app.use(cors());
app.use(express.json());

//---------------------------------------------------------------------------------------//

//GET PARA JSON

// Ruta base de la carpeta json
const jsonBasePath = path.join(__dirname, 'json'); // Ajustado para que use la ruta correcta dentro de backend

/**
 * Endpoint para devolver el contenido de la carpeta `json`
 * Devuelve una lista de todos los archivos y carpetas dentro del directorio `json`.
 */
app.get('/json', (req, res) => {
  fs.readdir(jsonBasePath, { withFileTypes: true }, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el directorio json' });
    }

    // Devuelve un array con los nombres de todos los archivos y carpetas
    const content = files.map(file => file.name);
    res.json(content);
  });
});

/**
 * Endpoint para devolver solo las carpetas dentro de `json`
 * Filtra y devuelve únicamente los directorios dentro de la carpeta `json`.
 */
app.get('/json/:folder', (req, res) => {
  const { folder } = req.params;
  const folderPath = path.join(jsonBasePath, folder);

  // Verificar que la carpeta exista
  fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      return res.status(404).json({ error: 'Carpeta no encontrada' });
    }

    // Listar los archivos JSON dentro de la carpeta
    const jsonFiles = files
      .filter(file => file.isFile() && file.name.endsWith('.json'))
      .map(file => file.name);

    res.json(jsonFiles);
  });
});

/**
 * Endpoint para devolver el contenido de un archivo JSON dentro de una carpeta específica
 * Permite acceder a un archivo JSON en el formato `/json/:folder/:file`.
 */
app.get('/json/:folder/:file', (req, res) => {
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

//-------------------------------------------------------------------------------------------//

//POST PARA LOGIN

// POST para login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verificar que el cuerpo de la petición contiene los datos necesarios
  if (!username || !password) {
    return res.status(400).json({ error: 'Debe proporcionar usuario y contraseña.' });
  }

  // Simulación de validación: cualquier correo y contraseña son válidos
  // Aquí puedes cambiar la lógica para lo que necesites
  const user = { username, password }; // Aquí el usuario puede ser cualquier cosa, sin validación

  // Generar token JWT para el usuario
  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

  // Devolver el token al cliente
  res.json({ message: 'Autenticación exitosa', token });
});

//----------------------------------------------------------------------------------------//

// Middleware de autorización
const authenticateToken = (req, res, next) => {
  // Obtener el token del encabezado de la solicitud (Authorization: Bearer <token>)
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Si no se encuentra el token, devolver error
  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado. Token no proporcionado.' });
  }

  // Verificar y decodificar el token
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Acceso no autorizado. Token inválido.' });
    }
    // Si el token es válido, se agrega el objeto 'user' al request
    req.user = user;
    next(); // Continuar con la ejecución de la siguiente función o ruta
  });
};

//---------------------------------------------------------------------------------//

// Servidor en ejecución
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

