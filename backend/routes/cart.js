const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();
const jwt = require('jsonwebtoken');
router.use(express.json());

// Endpoint para guardar los items del carrito en la base de datos
router.post('/cart', async (req, res) => {
  try {
    const { products } = req.body;

    //Obtenemos el token de los headers para obtener el ID del usuario logueado
    const token = req.headers.authorization?.split(' ')[1];
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Almacena solo el ID del usuario en req.userId
    const userId = decoded.id; // Aquí solo guardamos el ID

    // Validar si el usuario existe
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return res.status(404).json({
        error: 'Usuario no encontrado.',
      });
    }

    // Crear el carrito y asociarlo con los productos
    const newCart = await prisma.cart.create({
      data: {
        userId: userId,
        // Si deseas agregar productos, puedes usar la propiedad connect
        products: {
          create: products.map((product) => ({
            productId: product.productId, // Relaciona con el producto existente
            quantity: product.quantity,
          })),
        },
      },
    });

    res.json({
      mensaje: 'Carrito guardado exitosamente',
      cart: {
        id: newCart.id,
      },
    });
  } catch (error) {
    console.error('Error al guardar carrito:', error);
    res.status(500).json({
      error: 'Error al guardar carrito',
    });
  }
});
module.exports = router;
