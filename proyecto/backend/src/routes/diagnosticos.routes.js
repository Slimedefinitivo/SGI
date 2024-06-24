import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.post('/diagnosticos', async (req, res) => {
  const { 
    ct_descripcion,
    cn_tiempoSolucion,
    ct_observacion,
    ct_cod_incidencia, // Asegúrate de incluir esto,
    ct_requiereCompra
  } = req.body;

  try {
    const nuevoDiagnostico = await prisma.t_Diagnosticos.create({
      data: {
        ct_descripcion,
        cn_tiempoSolucion,
        ct_observacion,
        ct_cod_incidencia,
        ct_requiereCompra // Y de almacenarlo aquí
       
      },
    });
    res.json(nuevoDiagnostico);
  } catch (error) {
    console.error('Error al crear el diagnóstico:', error);
    res.status(500).json({ error: 'Error al crear el diagnóstico' });
  }
});

router.put('/diagnosticos/:id', async (req, res) => {
  const { id } = req.params;
  const { 
    ct_descripcion,
    cn_tiempoSolucion,
    ct_observacion,
    ct_cod_incidencia,
    ct_requiereCompra
  } = req.body;

  try {
    const updatedDiagnostico = await prisma.t_Diagnosticos.update({
      where: { cn_cod_diagnostico: parseInt(id, 10) },
      data: {
        ct_descripcion,
        cn_tiempoSolucion,
        ct_observacion,
        ct_cod_incidencia,
        ct_requiereCompra
      },
    });
    res.json(updatedDiagnostico);
  } catch (error) {
    console.error('Error al actualizar el diagnóstico:', error);
    res.status(500).json({ error: 'Error al actualizar el diagnóstico' });
  }
});



export default router;
