import { Router } from "express";
import * as productsCtrl from "../controllers/products"
import { verifyToken } from "../middlewares"

const router = Router();

router.post("/", verifyToken, productsCtrl.createProduct)

router.get("/", productsCtrl.getProducts)

router.get("/:id", productsCtrl.getProductById)

router.put("/:id", productsCtrl.updateProductById)

router.delete("/:id", productsCtrl.deleteProductById)

export default router;