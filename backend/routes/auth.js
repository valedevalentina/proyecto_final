const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

router.use(express.json());


// Endpont de login
router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Validar que se envíen los campos requeridos
      if (!username || !password) {
        return res.status(400).json({
          error: 'Debe proporcionar usuario y contraseña.',
        });
      }
  
      // Buscar el usuario
      const user = await prisma.user.findUnique({
        where: { username },
      });
  
      // Verificar si el usuario existe y la contraseña es correcta
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({
          error: 'Credenciales inválidas',
        });
      }
  
      // Generar el token
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      // Responder con el token
  
      res.json({
        mensaje: 'Login exitoso',
        token,
        user: {
          id: user.id,
          username: user.username,
        },
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({
        error: 'Error al procesar el login',
      });
    }
  });
  
  // Endpoint de registro (opcional, pero útil para crear usuarios)
  router.post('/user', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Validar campos requeridos
      if (!username || !password) {
        return res.status(400).json({
          error: 'Todos los campos son requeridos',
        });
      }
  
      // Verificar si el usuario ya existe
      const userExist = await prisma.user.findUnique({
        where: { username },
      });
  
      if (userExist) {
        return res.status(400).json({
          error: 'El usuario ya está registrado',
        });
      }
  
      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(password, 5);
  
      // Crear el usuario
      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });
  
      res.status(201).json({
        mensaje: 'Usuario creado exitosamente',
        usuario: {
          id: user.id,
          username: user.username,
        },
      });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({
        error: 'Error al procesar el registro',
      });
    }
  });
  
  module.exports = router;