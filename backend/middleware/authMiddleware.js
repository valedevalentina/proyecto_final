const jwt = require('jsonwebtoken'); // Importar la librería jsonwebtoken

const authMiddleware = (req, res, next) => {
    try {
      // Obtener el token del header
      const token = req.headers.authorization?.split(' ')[1];
  
      if (!token) {
        return res.status(401).json({ error: 'Token no provisto' });
      }
  
      // Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Token invalido' });
    }
  };
  
  module.exports = authMiddleware;
 