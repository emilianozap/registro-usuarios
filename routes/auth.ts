import { Router } from "express";
import { check } from "express-validator";
import { registerUser, verifyUser, login, recuperarPassword, editPassword } from "../controllers/auth";
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

router.patch("/verify",[
    check("email", "el email es requerido").isEmail(),
    check("code", "el código es obligatorio").not().isEmpty(),

    recolectarErrores,

],
verifyUser)

router.post("/login",[
    check("email", "el email es obligatorio").isEmail(),
    check("password", "el password es obligatorio y debe ser de 6 caracteres").isLength({
        min: 6
    }),
    recolectarErrores

],login)

router.post("/recuperar",[
    check("email", "el email es requerido").isEmail(),
  
    recolectarErrores
],
recuperarPassword
)

router.patch("/password",[
    check("password", "el password es obligatorio y debe ser de 6 caracteres").isLength({
        min: 6
    }),
    check("code", "el código es obligatorio").not().isEmpty(),
    recolectarErrores
],
editPassword
)




export default router


