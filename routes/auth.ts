import { Router } from "express";
import { check } from "express-validator";
import { registerUser } from "../controllers/auth";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { existeEmail } from "../helpers/validacionesDB";

const router = Router()

router.post("/register",[
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").isEmail(),
    check("password", "el password es obligatorio y debe ser de 6 caracteres").isLength({
        min: 6
    }),
    //validación custom
    check("email").custom(existeEmail),
    //middlewares custom
    recolectarErrores
], registerUser)


export default router


