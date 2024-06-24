import { Router} from 'express';
import {PrismaClient} from '@prisma/client';
import multer from 'multer';


const router = Router();
const prisma = new PrismaClient();

// Configuración de multer para manejar la subida de imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

//original y bueno
// router.get('/incidencias', async (req, res) => {
//     try {
//       const incidencias = await prisma.t_Incidencias.findMany();
//       res.json(incidencias);
//     } catch (error) {
//       console.error('Error fetching incidencias:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

router.get('/incidencias', async (req, res) => {
  try {
    const incidencias = await prisma.t_Incidencias.findMany({
      include: {
        estadosxincidencias: {
          include: {
            estado: true // Esto incluye la descripción del estado
          }
        }
      }
    });
    res.json(incidencias);
  } catch (error) {
    console.error('Error fetching incidencias:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.get('/incidencias/reporte', async (req, res) => {
  try {
    // Obtener todas las incidencias con técnicos asignados y sus estados
    const incidenciasConTecnico = await prisma.t_Incidencias.findMany({
      where: {
        ct_nombreTecnico: {
          not: null
        }
      },
      select: {
        ct_cod_incidencia: true,
        ct_nombreTecnico: true,
        estadosxincidencias: {
          select: {
            cn_cod_estado: true,
          },
          where: {
            OR: [
              { cn_cod_estado: 2 }, // Pendientes
              { cn_cod_estado: 9 }, // Terminados
            ]
          }
        }
      }
    });

    // Objeto para almacenar el reporte totalizado por técnico
    const reporteTotalizado = {};

    // Procesar cada incidencia para agregar al reporte totalizado
    incidenciasConTecnico.forEach(incidencia => {
      const { ct_cod_incidencia, ct_nombreTecnico, estadosxincidencias } = incidencia;
      const pendientes = estadosxincidencias.filter(e => e.cn_cod_estado === 2).length;
      const terminados = estadosxincidencias.filter(e => e.cn_cod_estado === 9).length;

      if (!reporteTotalizado[ct_nombreTecnico]) {
        reporteTotalizado[ct_nombreTecnico] = {
          ct_nombreTecnico,
          pendientes: 0,
          terminados: 0,
        };
      }

      reporteTotalizado[ct_nombreTecnico].pendientes += pendientes;
      reporteTotalizado[ct_nombreTecnico].terminados += terminados;
    });

    // Convertir el objeto a un array para el formato de respuesta
    const formattedReport = Object.values(reporteTotalizado);

    res.json(formattedReport);
  } catch (error) {
    console.error('Error al obtener los datos de incidencias:', error);
    res.status(500).json({ error: 'Error al obtener los datos de incidencias' });
  }
});




//oriignal y bueno 
// router.post('/incidencias', async (req, res) => {
//     const { 
//       ct_cod_incidencia,
//        ct_titulo, 
//        ct_descripcion,
//         ct_lugar,
//          cn_cod_usuario,
//           cn_cod_estado,

//           //aqui va lo nuevo
//           cn_costos,
//           ct_prioridad,
//           ct_riesgo,
//           ct_afectacion,
//            ct_categoria  
                
//         } = req.body;

//     try {
//         const newIncidencia = await prisma.t_Incidencias.create({
//             data: {
//                 ct_cod_incidencia,
//                 cd_fechaHora: new Date(),
//                 ct_titulo,
//                 ct_descripcion,
//                 ct_lugar,
//                 cn_cod_usuario,
//                 cn_cod_estado,

//                 //nuevo
//                 cn_costos,
//                ct_prioridad,
//               ct_riesgo,
//               ct_afectacion,
//                ct_categoria
//             }
//         });
//         res.json(newIncidencia);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

router.post('/incidencias', async (req, res) => {
  const { 
    ct_cod_incidencia,
    ct_titulo, 
    ct_descripcion,
    ct_lugar,
    cn_cod_usuario,
    cn_cod_estado,

    // Campos adicionales
    cn_costos,
    ct_prioridad,
    ct_riesgo,
    ct_afectacion,
    ct_categoria
  } = req.body;

  try {
    const newIncidencia = await prisma.t_Incidencias.create({
      data: {
        ct_cod_incidencia,
        cd_fechaHora: new Date(),
        ct_titulo,
        ct_descripcion,
        ct_lugar,
        cn_cod_usuario,
        cn_cod_estado,

        // Campos adicionales
        cn_costos,
        ct_prioridad,
        ct_riesgo,
        ct_afectacion,
        ct_categoria
      }
    });

    // Registrar el estado inicial en la tabla T_EstadosXIncidencias
    await prisma.t_EstadosXIncidencias.create({
      data: {
        cn_cod_incidencia: ct_cod_incidencia,
        cn_cod_estado,
        cd_fechaCambio: new Date()
      }
    });

    res.json(newIncidencia);
  } catch (error) {
    console.error('Error creating incidencia:', error);
    res.status(400).json({ error: error.message });
  }
});







//metodo bueno y correcto
// router.put('/incidencias/:ct_cod_incidencia', async (req, res) => {
//   const { 
//     ct_titulo, 
//     ct_descripcion,
//     ct_lugar,
//     cn_costos,
//     cn_duracion,
//     ct_prioridad,
//     ct_riesgo,
//     ct_afectacion,
//     ct_categoria,
//     cn_cod_encargado,  // Nuevo campo a actualizar
//     ct_nombreTecnico,
//     ct_justificacionDeCierre,
//     ct_estadoDeCierre


//   } = req.body;

//   const { ct_cod_incidencia } = req.params;

//   try {
//     const updatedIncidencia = await prisma.t_Incidencias.update({
//       where: {
//         ct_cod_incidencia: ct_cod_incidencia
//       },
//       data: {
//         ct_titulo,
//         ct_descripcion,
//         ct_lugar,
//         cn_costos,
//         cn_duracion,
//         ct_prioridad,
//         ct_riesgo,
//         ct_afectacion,
//         ct_categoria,
//         cn_cod_encargado, // Nuevo campo a actualizar
//         ct_nombreTecnico,
//         ct_justificacionDeCierre,
//         ct_estadoDeCierre
//       }
//     });
//     res.json(updatedIncidencia);
//   } catch (error) {
//     console.error('Error updating incidencia:', error);
//     res.status(400).json({ error: 'Error updating incidencia' });
//   }
// });

//rste iba bueno y correcto
router.put('/incidencias/:ct_cod_incidencia', async (req, res) => {
  const { 
    ct_titulo, 
    ct_descripcion,
    ct_lugar,
    cn_costos,
    cn_duracion,
    ct_prioridad,
    ct_riesgo,
    ct_afectacion,
    ct_categoria,
    cn_cod_encargado,
    ct_nombreTecnico,
    ct_justificacionDeCierre,
    ct_estadoDeCierre,
    cn_cod_estado  // Nuevo campo para potencial cambio de estado
  } = req.body;

  const { ct_cod_incidencia } = req.params;

  try {
    const updatedIncidencia = await prisma.t_Incidencias.update({
      where: {
        ct_cod_incidencia: ct_cod_incidencia
      },
      data: {
        ct_titulo,
        ct_descripcion,
        ct_lugar,
        cn_costos,
        cn_duracion,
        ct_prioridad,
        ct_riesgo,
        ct_afectacion,
        ct_categoria,
        cn_cod_encargado,
        ct_nombreTecnico,
        ct_justificacionDeCierre,
        ct_estadoDeCierre,
        cn_cod_estado  // Potencial cambio de estado
      }
    });

    let estadoDescripcion;
    if (cn_cod_estado) {
      // Registrar el cambio de estado en la tabla T_EstadosXIncidencias
      await prisma.t_EstadosXIncidencias.create({
        data: {
          cn_cod_incidencia: ct_cod_incidencia,
          cn_cod_estado,
          cd_fechaCambio: new Date()
        }
      });

      // Obtener la descripción del estado
      const estado = await prisma.t_Estados.findUnique({
        where: {
          cn_cod_estado: cn_cod_estado
        },
        select: {
          ct_descripcion: true
        }
      });

      estadoDescripcion = estado ? estado.ct_descripcion : null;
    }

    // Devolver la incidencia actualizada junto con la descripción del estado
    res.json({
      ...updatedIncidencia,
      cn_cod_estado_descripcion: estadoDescripcion
    });
  } catch (error) {
    console.error('Error updating incidencia:', error);
    res.status(400).json({ error: 'Error updating incidencia' });
  }
});







  

export default router;