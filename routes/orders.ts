import { Router } from "express";
import { check } from "express-validator";
import { getOrdenes, createOrder } from "../controllers/orders";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { validarJWT } from "../middlewares/validarJWT";
import { isVerified } from "../middlewares/validarVerificado";

const router = Router();

router.get("/", [validarJWT, recolectarErrores], getOrdenes);

router.post(
  "/",
  [
    validarJWT,
    isVerified,
    check("price", "el precio es obligatorio").not().isEmpty(),
    check("shippingCost", "el costo de envió es obligatorio").not().isEmpty(),
    check("total", "el total es obligatorio").not().isEmpty(),
    check("shippingDetails", "los detalles del envió son obligatorios")
      .not()
      .isEmpty(),
    check("items", "el array de productos es obligatorio").not().isEmpty(),
    recolectarErrores,
  ],
  createOrder
);

export default router;
