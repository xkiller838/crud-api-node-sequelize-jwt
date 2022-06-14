import { Router } from "express";
import * as usersCtrl from "../controllers/user"
const router = Router();

router.post("/", usersCtrl.createUser)

router.get("/", usersCtrl.getUsers)

router.get("/:id", usersCtrl.getUserById)

router.put("/:id", usersCtrl.updateUserById)

router.delete("/:id", usersCtrl.deleteUserById)

export default router;