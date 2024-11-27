const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

router.use(express.json());

// Endpoint para guardar los items del carrito en la base de datos
  router.post('/cart', async (req, res) => {
    try {
      const { userId, products } = req.body;

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
            create: products.map(product => ({
              name: product.name,
              productId: product.id, // Relaciona con el producto existente
              description: product.description,
              cost: product.cost,
              currency: product.currency,
              image: product.image,
              quantity: product.quantity
            }))
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