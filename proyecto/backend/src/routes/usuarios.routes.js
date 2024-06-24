import { Router } from "express";
import { getUsuarios } from "../controller/usuarios.controller.js";
import { verifyToken } from '../middleware/authenticateToken.js';
import {PrismaClient} from '@prisma/client';


const router = Router();
const prisma = new PrismaClient();

router.get("/getUsuarios", verifyToken, getUsuarios);



  



export default router;
