const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

router.use(express.json());


// Endpont de login
router.post('/cart', async (req, res) => {
    try {
      const {  userId, products, name, description, cost, currency, image, quantity, productsInCart} = req.body;
//HACER VALIDACIONES DE CAMPOS REQUERIDOS, POSMAN
      // Validar que se envíen los campos requeridos
     /* if (!username || !password) {
        return res.status(400).json({
          error: 'Debe proporcionar usuario y contraseña.',
        });
      } */
  
      // Buscar el usuario
      const newCart = await prisma.cart.create({
        data: {
            userId: userId,
            // Si deseas agregar productos, puedes usar la propiedad connect
            products: {
                create: products.map(product => ({
                    name: product.name,
                    description: product.description,
                    cost: product.cost,
                    currency: product.currency,
                    image: product.image,
                    quantity: product.quantity
                }))
            }
        }
    });
      
      res.json({
        mensaje: 'Cart guardado exitosamente',
        cart: {
          id: newCart.id,
        },
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({
        error: 'Error al crear carro',
      });
    }
  });
    
  module.exports = router;