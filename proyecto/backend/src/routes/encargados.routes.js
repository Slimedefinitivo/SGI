import { Router} from 'express';
import {PrismaClient} from '@prisma/client';

//import { prisma } from "../db.js";


const router = Router();

const prisma = new PrismaClient();

// Get names of technicians
router.get('/encargados', async (req, res) => {
  try {
    const tecnicos = await prisma.t_usuarios.findMany({
      where: {
        ct_puesto: 'encargado', // Asumiendo que el puesto de los técnicos es 'tecnico'
      },
      select: {
        ct_nombre: true,
      },
    });
    res.json(tecnicos);
  } catch (error) {
    console.error('Error fetching encargados:', error);
    res.status(500).json({ message: 'Error fetching encargados' });
  }
});

export default router;