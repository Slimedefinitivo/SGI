import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import usuariosRoutes from "./routes/usuarios.routes.js";
import authRoutes from "./routes/auth.routes.js";
import incidenciasRoutes from './routes/incidencias.routes.js';  // importando incidencias
import diagnosticosRoutes from './routes/diagnosticos.routes.js'; 
import tecnicosRouter from './routes/tecnicos.routes.js';
import encargadosRouter from './routes/encargados.routes.js'
import estadoXincidenciaRoutes from './routes/estadoXincidencia.routes.js';

import { FRONTEND_URL } from "./config.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
);
app.use(cookieParser());

app.use("/sgi", usuariosRoutes);
app.use("/sgi", authRoutes);
app.use("/sgi", incidenciasRoutes);
app.use("/sgi", diagnosticosRoutes); // usando diagnosticos
app.use('/sgi', tecnicosRouter);
app.use('/sgi', encargadosRouter);
app.use('/sgi', estadoXincidenciaRoutes);




app.listen(3000);
console.log("Puerto 3000");
