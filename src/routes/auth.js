import { Router } from "express";
/* el * esta diciendo que importe todo desde el controlador*/
import * as authCtrl from "../controllers/auth"
const router = Router();

router.post("/", authCtrl.login)

router.post("/register", authCtrl.register)

export default router;