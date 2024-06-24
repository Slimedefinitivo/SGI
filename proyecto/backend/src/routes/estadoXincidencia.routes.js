import {Router} from 'express';
import {PrismaClient} from '@prisma/client';


const router = Router();
const prisma = new PrismaClient();

router.get('/estadosxincidencias', async (req, res) => {
    try {
      const estadosXIncidencias = await prisma.t_EstadosXIncidencias.findMany({
        include: {
          estado: true, // Incluye la información de la tabla T_Estados
          incidencia: true // Incluye la información de la tabla T_Incidencias
        }
      });
      res.json(estadosXIncidencias);
    } catch (error) {
      console.error('Error fetching estadosxincidencias:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  //METODOS POST Y PUT USAR LOS DE INCIDENCIA

  // router.post('/estadosxincidencias', async (req, res) => {
  //   try {
  //     const { cn_cod_incidencia, cn_cod_estado } = req.body;
  
  //     // Verificar la existencia de la incidencia y el estado
  //     const incidencia = await prisma.t_Incidencias.findUnique({
  //       where: { ct_cod_incidencia: cn_cod_incidencia }
  //     });
  
  //     const estado = await prisma.t_Estados.findUnique({
  //       where: { cn_cod_estado }
  //     });
  
  //     if (!incidencia) {
  //       return res.status(404).json({ error: `Incidencia ${cn_cod_incidencia} not found` });
  //     }
  
  //     if (!estado) {
  //       return res.status(404).json({ error: `Estado ${cn_cod_estado} not found` });
  //     }
  
  //     const nuevaFila = await prisma.t_EstadosXIncidencias.create({
  //       data: {
  //         cn_cod_incidencia,
  //         cn_cod_estado,
  //         cd_fechaCambio: new Date(),
  //         incidencia: {
  //           connect: { ct_cod_incidencia: cn_cod_incidencia }
  //         },
  //         estado: {
  //           connect: { cn_cod_estado }
  //         }
  //       },
  //       include: {
  //         estado: true,
  //         incidencia: true
  //       }
  //     });
  
  //     res.json(nuevaFila);
  //   } catch (error) {
  //     console.error('Error al crear estadosxincidencias:', error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // });
  
  // router.put('/estadosxincidencias/:id', async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const { cn_cod_incidencia, cn_cod_estado } = req.body;
  
  //     // Verificar la existencia de la incidencia y el estado
  //     const incidencia = await prisma.t_Incidencias.findUnique({
  //       where: { ct_cod_incidencia: cn_cod_incidencia }
  //     });
  
  //     const estado = await prisma.t_Estados.findUnique({
  //       where: { cn_cod_estado }
  //     });
  
  //     if (!incidencia) {
  //       return res.status(404).json({ error: `Incidencia ${cn_cod_incidencia} not found` });
  //     }
  
  //     if (!estado) {
  //       return res.status(404).json({ error: `Estado ${cn_cod_estado} not found` });
  //     }
  
  //     const updatedFila = await prisma.t_EstadosXIncidencias.update({
  //       where: { id: parseInt(id, 10) },
  //       data: {
  //         cn_cod_incidencia,
  //         cn_cod_estado,
  //         cd_fechaCambio: new Date(),
  //         incidencia: {
  //           connect: { ct_cod_incidencia: cn_cod_incidencia }
  //         },
  //         estado: {
  //           connect: { cn_cod_estado }
  //         }
  //       },
  //       include: {
  //         estado: true,
  //         incidencia: true
  //       }
  //     });
  
  //     res.json(updatedFila);
  //   } catch (error) {
  //     console.error('Error al actualizar estadosxincidencias:', error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // });

export default router;