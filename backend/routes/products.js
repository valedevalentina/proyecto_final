const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

router.post('/products', async (req, res) => {
  try {
    const { products } = req.body;

    // Verificamos que el cuerpo de la solicitud tenga productos
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: 'Debe proporcionar un array de productos' });
    }

    // Creamos los productos en la base de datos
    const createdProducts = await prisma.product.createMany({
      data: products, // Utilizamos el array de productos recibido en la solicitud
    });

    // Respondemos con éxito
    res.status(201).json({
      message: 'Productos almacenados correctamente',
      count: createdProducts.count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al almacenar los productos' });
  }
});

module.exports = router;
